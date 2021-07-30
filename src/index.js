const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let bird = new Image();
let pipe = new Image();
let birdX = 100;
let birdY = 100;
let gravity = 5;

bird.src = "../asset/bird.png";
pipe.src = "../asset/pipe.png";

setInterval(function () {
    ctx.clearRect(0, 0, 1520, 699);
    ctx.drawImage(bird, birdX, birdY);
    birdY += gravity;
}, 20);
