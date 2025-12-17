import { artists } from "./data/artists-data.js?v=2";
import { auth } from "./firebase-config.js";

export function initArtistPage() {
    const params = new URLSearchParams(window.location.search);
    const artistId = params.get("id");
    const container = document.getElementById("artist-content");
    const loading = document.getElementById("artist-loading");

    if (!artistId) {
        window.location.href = "artists.html";
        return;
    }

    const artist = artists.find(a => a.id === artistId);

    if (!artist) {
        loading.textContent = "Artist not found.";
        return;
    }

    // Populate Data
    document.title = `${artist.name} - Swaramanjusha`;
    const nameEl = document.getElementById("artist-name");
    const bioEl = document.getElementById("artist-bio");
    const imgEl = document.getElementById("artist-img");

    if (nameEl) nameEl.textContent = artist.name;
    if (bioEl) bioEl.textContent = artist.bio;
    if (imgEl) imgEl.src = artist.image;

    // Render Songs
    const songsList = document.getElementById("songs-list");
    if (songsList) {
        songsList.innerHTML = ""; // clear

        if (artist.songs && artist.songs.length > 0) {
            artist.songs.forEach((song, index) => {
                const div = document.createElement("div");
                div.className = "song-item";
                div.innerHTML = `
                    <div class="song-details">
                        <button class="play-btn" data-url="${song.url}" data-title="${song.title}" data-artist="${artist.name}">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                        <div>
                            <div class="song-title">${song.title}</div>
                            <div class="song-meta">${song.duration || "--:--"}</div>
                        </div>
                    </div>
                    <button class="download-btn" data-url="${song.url}" data-title="${song.title}">
                        Download MP3
                    </button>
                `;
                songsList.appendChild(div);
            });
        } else {
            songsList.innerHTML = "<div style='color:var(--text-secondary); text-align:center;'>No songs available for this artist yet.</div>";
        }

        // Event Listeners for Dynamic content
        songsList.addEventListener("click", (e) => {
            // Play
            const playBtn = e.target.closest(".play-btn");
            if (playBtn) {
                playSong(playBtn.dataset.url, playBtn.dataset.title, playBtn.dataset.artist);
            }

            // Download
            const dlBtn = e.target.closest(".download-btn");
            if (dlBtn) {
                handleDownload(dlBtn.dataset.url, dlBtn.dataset.title);
            }
        });
    }

    // Show Content
    if (loading) loading.style.display = "none";
    if (container) container.style.display = "flex";
}

// Player Logic
const audio = document.getElementById("audio-element");
const playerBar = document.getElementById("fixed-player");
const fpTitle = document.getElementById("fp-title");
const fpArtist = document.getElementById("fp-artist");
const fpPlayPause = document.getElementById("fp-play-pause");
const fpProgress = document.getElementById("fp-progress");
const fpTime = document.getElementById("fp-time");

function playSong(url, title, artistName) {
    if (!url) return;
    if (!audio) return;

    if (playerBar) playerBar.classList.add("active");

    // If clicking the same song, toggle play/pause
    // Note: audio.src might be absolute, url might be relative or absolute. simpler check:
    if (audio.src === url || audio.src.endsWith(url)) {
        if (audio.paused) audio.play();
        else audio.pause();
    } else {
        audio.src = url;
        audio.play();
    }

    if (fpTitle) fpTitle.textContent = title;
    if (fpArtist) fpArtist.textContent = artistName;
    updatePlayPauseIcon(!audio.paused);
}

function updatePlayPauseIcon(isPlaying) {
    if (!fpPlayPause) return;
    fpPlayPause.innerHTML = isPlaying
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' // Pause
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'; // Play
}

// Global Player Events
if (fpPlayPause && audio) {
    fpPlayPause.addEventListener("click", () => {
        if (audio.paused) audio.play();
        else audio.pause();
    });
}

if (audio) {
    audio.addEventListener("play", () => updatePlayPauseIcon(true));
    audio.addEventListener("pause", () => updatePlayPauseIcon(false));
    audio.addEventListener("timeupdate", () => {
        if (audio.duration && fpProgress && fpTime) {
            const pct = (audio.currentTime / audio.duration) * 100;
            fpProgress.value = pct;
            fpTime.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
        }
    });
}

if (fpProgress && audio) {
    fpProgress.addEventListener("input", (e) => {
        const pct = e.target.value;
        if (audio.duration) {
            audio.currentTime = (pct / 100) * audio.duration;
        }
    });

    audio.addEventListener('error', (e) => {
        let msg = "Error playing audio.";
        switch (e.target.error.code) {
            case e.target.error.MEDIA_ERR_ABORTED:
                msg = "Playback aborted.";
                break;
            case e.target.error.MEDIA_ERR_NETWORK:
                msg = "Network error caused download to fail.";
                break;
            case e.target.error.MEDIA_ERR_DECODE:
                msg = "The audio playback was aborted due to a corruption problem or because the features used by your browser are not supported.";
                break;
            case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                msg = "The audio format is not supported by your browser or the file is missing.";
                break;
            default:
                msg = "An unknown error occurred.";
                break;
        }
        alert(msg + "\nCheck if the file exists and is a supported format (MP3, WAV, AAC).");
        updatePlayPauseIcon(false);
    });
}

function formatTime(s) {
    if (isNaN(s)) return "00:00";
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Download Logic
// Download Logic
async function handleDownload(url, title) {
    const user = auth.currentUser;
    if (!user) {
        alert("Please login to download music.");
        return;
    }

    // specific fix for spaces in filenames if not already encoded
    // We only encode spaces, not slashes or colons.
    // Actually safe to just use as is if we trust the browser, but fetch might need encoded.
    const safeUrl = url.split('/').map(part => encodeURIComponent(part)).join('/');
    // Wait, that breaks http://... 
    // Simpler: just use the url as provided, but if it fails, we know why.
    // The issue is likely the space in "About Moropant Dandekar.mp3"

    // Better strategy: Verify file exists and is audio
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) {
            alert("Download failed: File not found (404).");
            return;
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
            alert("Download failed: File not found (Server returned website instead of audio). Please check the filename.");
            return;
        }
    } catch (e) {
        console.warn("Could not verify file before download:", e);
        // Continue to try downloading anyway just in case HEAD failed due to other reasons
    }

    // Trigger download
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = title || "song.mp3";
    anchor.target = "_blank";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}
