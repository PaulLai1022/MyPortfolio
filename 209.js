const audio = document.querySelector('audio');
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');
const audioCloseBtn = document.getElementById("audioCloseBtn");
const audioContainer = document.querySelector(".audioContainer");

let isShrunk = true; // Track canvas state
let isInit = false; // Track audio initialization
let analyser, dataArray;

// Initialize canvas
function initCvs() {
    const aspectRatio = window.innerWidth / (window.innerHeight / 2);
    cvs.width = window.innerWidth * devicePixelRatio;
    cvs.height = (window.innerHeight / 2) * devicePixelRatio;
}


initCvs();

audio.volume = 0.5; // Set initial volume

document.addEventListener("click",()=>{
    audio.play();
})


// Shrink canvas
audioCloseBtn.addEventListener("click", () => {
    shrinkCanvas();
});

// Expand canvas on click
cvs.addEventListener("click", () => {
    if (isShrunk) {
        expandCanvas();
    }
});

// Shrink canvas logic
function shrinkCanvas() {
    audio.classList.add("shrinkController");
    cvs.classList.add("shrink");
    audioContainer.classList.add("audioContainerShrink");
    audioCloseBtn.classList.add("closeShrink");
    isShrunk = true;

    setTimeout(() => {
        resizeCanvas(0.1, 0.1); // Shrink to 10% width and height
    }, 500); // Wait for CSS animation
}

// Expand canvas logic
function expandCanvas() {
    cvs.classList.remove("shrink");
    audio.classList.remove("shrinkController");
    audioContainer.classList.remove("audioContainerShrink");
    audioCloseBtn.classList.remove("closeShrink");
    isShrunk = false;

    setTimeout(() => {
        resizeCanvas(1, 0.5); // Expand to full width and half height
    }, 500); // Wait for CSS animation
}

// Resize canvas utility function
function resizeCanvas(widthFactor, heightFactor) {
    const displayWidth = window.innerWidth * widthFactor;
    const displayHeight = window.innerHeight * heightFactor;

    cvs.width = displayWidth * devicePixelRatio;
    cvs.height = displayHeight * devicePixelRatio;

    ctx.clearRect(0, 0, cvs.width, cvs.height); // Clear canvas
}

// Initialize audio context and analyser
audio.onplay = function () {
    if (isInit) return;

    try {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 512;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        isInit = true;

        // Resume AudioContext if suspended (for autoplay policies)
        document.addEventListener("click", () => {
            if (audioCtx.state === "suspended") {
                audioCtx.resume();
            }
        });
    } catch (error) {
        console.error("Web Audio API not supported:", error);
    }
};

// Draw visualization
function draw() {
    requestAnimationFrame(draw);

    const { width, height } = cvs;
    ctx.clearRect(0, 0, width, height);
    if (!isInit) return;

    analyser.getByteFrequencyData(dataArray);
    const len = dataArray.length / 2; // Use only the lower half frequencies
    const barWidth = width / len / 2; // Adjust bar width
    ctx.fillStyle = "#e0f9b5";

    for (let i = 0; i < len; i++) {
        const data = dataArray[i];
        const barHeight = (data / 255) * height;
        const x1 = i * barWidth + width / 2; // Right bars
        const x2 = width / 2 - (i + 1) * barWidth; // Left bars
        const y = height - barHeight;

        ctx.fillRect(x1, y, barWidth - 2, barHeight);
        ctx.fillRect(x2, y, barWidth - 2, barHeight);
    }
}

draw();
