const songNames = [
    "Blue screen kiss",
    "Glass candy sky",
    "Heart circuit",
    "Paper crown",
    "Paper cup calls",
    "Pixel heartbeat ex",
    "Pixel heartbeat",
    "Pixel heartbeat solo",
    "Plastic heartbeat",
    "Ten on repeat"
];

const museumFloor = document.querySelector('#museum-floor');

if (!museumFloor) {
    console.error('Could not find the museum floor container.');
} else {
    songNames.forEach(name => {
        const displayName = name.replace(/\b\w/g, l => l.toUpperCase());
        const item = document.createElement('div');
        item.className = 'exhibit-item';

        const trackInfo = document.createElement('div');
        trackInfo.className = 'track-info';
        trackInfo.innerHTML = `
            <h3>${displayName}</h3>
            <p>Digital Artifact — Audio File</p>
        `;

        const audio = document.createElement('audio');
        audio.controls = true;
        audio.preload = 'none';

        const sourceM4a = document.createElement('source');
        sourceM4a.src = encodeURI(`${name}.m4a`);
        sourceM4a.type = 'audio/mp4';

        const sourceMp3 = document.createElement('source');
        sourceMp3.src = encodeURI(`${name}.mp3`);
        sourceMp3.type = 'audio/mpeg';

        audio.appendChild(sourceM4a);
        audio.appendChild(sourceMp3);
        audio.appendChild(document.createTextNode('Your browser does not support audio playback.'));

        const errorMessage = document.createElement('div');
        errorMessage.className = 'audio-error';
        errorMessage.style.color = '#ff6b6b';
        errorMessage.style.marginTop = '8px';
        errorMessage.style.fontSize = '0.9rem';

        audio.addEventListener('error', () => {
            if (!errorMessage.textContent) {
                errorMessage.textContent = `Audio file missing or unsupported: ${name}.m4a (fallback to MP3 attempted).`;
            }
        });

        item.appendChild(trackInfo);
        item.appendChild(audio);
        item.appendChild(errorMessage);
        museumFloor.appendChild(item);
    });
}

// Stop other songs when one starts playing
document.addEventListener('play', function (event) {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        if (audio !== event.target) {
            audio.pause();
        }
    });
}, true);
