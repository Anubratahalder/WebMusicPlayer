document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const fileInput = document.getElementById('fileInput');
    const trackInfo = document.getElementById('trackInfo');
    const trackName = document.getElementById('trackName');

    let currentTrackIndex = 0;
    let tracks = [];

    // Handle file input change
    fileInput.addEventListener('change', function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            tracks = Array.from(files);
            loadTrack(0);
        }
    });

    // Load track into the audio player
    function loadTrack(index) {
        if (tracks.length > 0) {
            const track = tracks[index];
            const url = URL.createObjectURL(track);
            audioPlayer.src = url;
            trackName.textContent = track.name;
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            trackName.textContent = 'No track loaded';
        }
    }

    // Play/Pause button
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    // Stop button
    stopBtn.addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        playPauseBtn.textContent = 'Play';
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        if (tracks.length > 0) {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            loadTrack(currentTrackIndex);
        }
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        if (tracks.length > 0) {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            loadTrack(currentTrackIndex);
        }
    });
});
