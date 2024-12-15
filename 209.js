// 要操作的元素
const audio = document.querySelector('audio');
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');
let audioCloseBtn = document.getElementById("audioCloseBtn");
// let audioController = document.querySelector('.audioController');
let audioContainer = document.querySelector(".audioContainer");

// 初始化画布
function initCvs() {
    cvs.width = window.innerWidth * devicePixelRatio;
    cvs.height = (window.innerHeight / 2) * devicePixelRatio;
}

initCvs();

let isShrunk = true; // State to track whether the canvas is shrunk

audio.volume = 0.3; // Set initial volume to 50%

audioCloseBtn.addEventListener("click", () => {
    // Shrink the canvas
    audio.classList.add("shrinkController");
    cvs.classList.add("shrink");
    audioContainer.classList.add("audioContainerShrink")
    isShrunk = true;

    // Adjust canvas resolution after the animation
    setTimeout(() => {
        const displayWidth = window.innerWidth * 0.1; // 20% of viewport width
        const displayHeight = window.innerHeight * 0.1; // 20vh of viewport height
        cvs.width = displayWidth * devicePixelRatio; // Adjust for pixel ratio
        cvs.height = displayHeight * devicePixelRatio;

        ctx.clearRect(0, 0, cvs.width, cvs.height); // Clear the resized canvas
    }, 500); // Wait for the CSS animation to complete
});

// Add click event on the canvas to expand it back
cvs.addEventListener("click", () => {
    if (isShrunk) {
        // Expand the canvas
        
        cvs.classList.remove("shrink");
        audio.classList.remove("shrinkController");
        audioContainer.classList.remove("audioContainerShrink")
        aud
        isShrunk = false;

        // Adjust canvas resolution after the animation
        setTimeout(() => {
            const displayWidth = window.innerWidth; // Full width of viewport
            const displayHeight = window.innerHeight; // Full height of viewport
            cvs.width = displayWidth * devicePixelRatio; // Adjust for pixel ratio
            cvs.height = displayHeight * devicePixelRatio;

            ctx.clearRect(0, 0, cvs.width, cvs.height); // Clear the resized canvas
        }, 500); // Wait for the CSS animation to complete
    }
});


let isInit = false;

let dataArray;

let analyser;

audio.onplay = function () {

    if (isInit) {
        return;
    }


    const audioCtx = new AudioContext();

    const source = audioCtx.createMediaElementSource(audio);

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;

    dataArray = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);


    isInit = true;
};


function draw() {

    requestAnimationFrame(draw);


    const { width, height } = cvs;
    ctx.clearRect(0, 0, width, height);
    if (!isInit) {
        return;
    }

    analyser.getByteFrequencyData(dataArray);
    const len = dataArray.length / 2; 
    const barWidth = width / len / 2; 
    ctx.fillStyle = '#e0f9b5';

    for (let i = 0; i < len; i++) {
        
        const data = dataArray[i];
        const barHeight = (data / 255) * height; 
        const x1 = i * barWidth + width / 2;
        const x2 = width / 2 - (i + 1) * barWidth; 
        const y = height - barHeight; 
        ctx.fillRect(x1, y, barWidth - 2, barHeight);
        ctx.fillRect(x2, y, barWidth - 2, barHeight); 
        console.log(barHeight);
    }
}

draw();
