
/**
 * ARTIST DATA DATABASE
 * 
 * INSTRUCTIONS FOR UPDATING:
 * 1. Folders have been created for each artist in: assets/media/artists/[artist-id]/
 * 2. Place the artist's profile picture in their folder and name it 'image.jpg' (or update the path below).
 * 3. Place mp3 files in their folder.
 * 4. Update the 'songs' array for each artist with the filename.
 *    Example: url: "assets/media/artists/bhimsen-joshi/my_song.mp3"
 */

export const artists = [
    {
        id: "moropant-dandekar",
        name: "Moropant Dandekar",
        bio: "A legendary figure in Indian Classical Music, known for his pristine vocal clarity and mastery over rhythm.",
        image: "assets/media/artists/moropant-dandekar/image.jpg",
        songs: [
            { title: "About Moropant Dandekar", url: "assets/media/artists/moropant-dandekar/About Moropant Dandekar.mp3", duration: "--:--" },
            { title: "Bhairavi (MPEG - Convert to MP3)", url: "assets/media/artists/moropant-dandekar/Moropant Dandekar Bhairavi.mpeg", duration: "--:--" },
            { title: "Kafi Mishr (MPEG - Convert to MP3)", url: "assets/media/artists/moropant-dandekar/Moropant Dandekar Kafi Mishr.mpeg", duration: "--:--" }
        ]
    },
    {
        id: "pt-ram-marathe",
        name: "Pt. Ram Marathe",
        bio: "An exponent of the Agra Gharana, celebrated for his aggressive yet soulful style of singing.",
        image: "assets/media/artists/pt-ram-marathe/image.jpg",
        songs: []
    },
    {
        id: "pt-sangameshwar-gurav",
        name: "Pt. Sangameshwar Gurav",
        bio: "Known for his deep, resonant voice and intricate taans, representing the Kirana Gharana.",
        image: "assets/media/artists/pt-sangameshwar-gurav/image.jpg",
        songs: []
    },
    {
        id: "pt-kaivalyakumar-gurav",
        name: "Pt. Kaivalyakumar Gurav",
        bio: "A leading vocalist of the Kirana Gharana, possessing a voice with a three-octave range.",
        image: "assets/media/artists/pt-kaivalyakumar-gurav/image.jpg",
        songs: []
    },
    {
        id: "shri-anantrao-mahimkar",
        name: "Shri Anantrao Mahimkar",
        bio: "A respected guru and performer, known for preserving distinct traditional compositions.",
        image: "assets/media/artists/shri-anantrao-mahimkar/image.jpg",
        songs: []
    },
    {
        id: "pt-pralhadbuwa-joshi",
        name: "Pt. Pralhadbuwa Joshi",
        bio: "A scholarly musician who emphasized the purity of Raga and bandish (composition).",
        image: "assets/media/artists/pt-pralhadbuwa-joshi/image.jpg",
        songs: []
    },
    {
        id: "pt-bhimsen-joshi",
        name: "Pt. Bhimsen Joshi",
        bio: "Bharat Ratna awardee, known for his powerful voice and the Khayal form of singing.",
        image: "assets/media/artists/pt-bhimsen-joshi/image.jpg",
        songs: []
    },
    {
        id: "sonopant-dandekar",
        name: "Sonopant Dandekar",
        bio: "A maestro of the Gwalior Gharana, revered for his simple yet profound musical expression.",
        image: "assets/media/artists/sonopant-dandekar/image.jpg",
        songs: []
    },
    {
        id: "pt-suresh-babu-mane",
        name: "Pt. Suresh Babu Mane",
        bio: "Son of Ustad Abdul Karim Khan, known for his melodious and emotive style.",
        image: "assets/media/artists/pt-suresh-babu-mane/image.jpg",
        songs: []
    },
    {
        id: "pt-suresh-haldankar",
        name: "Pt. Suresh Haldankar",
        bio: "A versatile vocalist who excelled in Khayal, Thumri, and Natyasangeet.",
        image: "assets/media/artists/pt-suresh-haldankar/image.jpg",
        songs: []
    },
    {
        id: "pt-abdul-karim-khan",
        name: "Pt. Abdul Karim Khan Saheb",
        bio: "Founder of the Kirana Gharana, his voice is synonymous with emotion and tranquility.",
        image: "assets/media/artists/pt-abdul-karim-khan/image.jpg",
        songs: []
    },
    {
        id: "master-krishnarao",
        name: "Master Krishnarao Phulambrikar",
        bio: "A doyen of Indian classical music and a celebrated composer for musical theater.",
        image: "assets/media/artists/master-krishnarao/image.jpg",
        songs: []
    },
    {
        id: "roshanara-begum",
        name: "Roshanara Begum",
        bio: "The 'Queen of Kirana Gharana', known for her intricate tanas and emotional depth.",
        image: "assets/media/artists/roshanara-begum/image.jpg",
        songs: []
    },
    {
        id: "nisar-hussain-khan",
        name: "Nisar Hussain Khan",
        bio: "A virtuoso of the Sahaswan Gharana, famous for his fast taans and tarana singing.",
        image: "assets/media/artists/nisar-hussain-khan/image.jpg",
        songs: []
    },
    {
        id: "dv-paluskar",
        name: "D. V. Paluskar",
        bio: "A child prodigy who popularized Indian classical music with his devotional style.",
        image: "assets/media/artists/dv-paluskar/image.jpg",
        songs: []
    },
    {
        id: "salamat-nzakat-ali",
        name: "Salamat Ali and Nazakat Ali Khan",
        bio: "The legendary duo from the Sham Chaurasia Gharana, known for their technical brilliance.",
        image: "assets/media/artists/salamat-nzakat-ali/image.jpg",
        songs: []
    },
    {
        id: "pt-kumar-gandharva",
        name: "Pt. Kumar Gandharva",
        bio: "A revolutionary rebel who broke tradition to create his own unique style.",
        image: "assets/media/artists/pt-kumar-gandharva/image.jpg",
        songs: []
    },
    {
        id: "nasir-ahmad-khan",
        name: "Nasir Ahmad Khan",
        bio: "A stalwart of the Delhi Gharana, known for his command over diverse musical forms.",
        image: "assets/media/artists/nasir-ahmad-khan/image.jpg",
        songs: []
    },
    {
        id: "faiyaz-khan",
        name: "Faiyaz Khan",
        bio: "Known as 'Aftab-e-Mousiqui' (Sun of Music), a titan of the Agra Gharana.",
        image: "assets/media/artists/faiyaz-khan/image.jpg",
        songs: []
    },
    {
        id: "pt-appasaheb-jalgaonkar",
        name: "Pt. Appasaheb Jalgaonkar",
        bio: "A master of the Harmonium, who elevated the instrument to a solo status.",
        image: "assets/media/artists/pt-appasaheb-jalgaonkar/image.jpg",
        songs: []
    },
    {
        id: "pt-anokhelal-mishra",
        name: "Pt. Anokhelal Mishra",
        bio: "The 'Samrat' of Tabla, known for his clarity, speed, and sweetness of tonal quality.",
        image: "assets/media/artists/pt-anokhelal-mishra/image.jpg",
        songs: []
    },
    {
        id: "pt-ahmadjan-thirakhwa",
        name: "Pt. Ahmadjan Thirakhwa",
        bio: "Widely considered the greatest Tabla player of the 20th century.",
        image: "assets/media/artists/pt-ahmadjan-thirakhwa/image.jpg",
        songs: []
    },
    {
        id: "gangubai-hangal",
        name: "Gangubai Hangal",
        bio: "Known for her powerful and deep voice, preserving the purity of the Kirana Gharana.",
        image: "assets/media/artists/gangubai-hangal/image.jpg",
        songs: []
    },
    {
        id: "bade-ghulam-ali-khan",
        name: "Bade Ghulam Ali Khan",
        bio: "The legend of Patiala Gharana, his voice flowed with effortless melody and emotion.",
        image: "assets/media/artists/bade-ghulam-ali-khan/image.jpg",
        songs: []
    },
    {
        id: "latafat-hussain-khan",
        name: "Latafat Hussain Khan",
        bio: "A prominent vocalist of the Agra Gharana, known for his robust style.",
        image: "assets/media/artists/latafat-hussain-khan/image.jpg",
        songs: []
    },
    {
        id: "mushtaq-hussain-khan",
        name: "Mushtaq Hussain Khan",
        bio: "The first recipient of the Sangeet Natak Akademi Award, from the Rampur-Sahaswan Gharana.",
        image: "assets/media/artists/mushtaq-hussain-khan/image.jpg",
        songs: []
    }
];
