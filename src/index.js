const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let bird = new Image();
let pipe = new Image();
let birdX = 100;
let birdY = 100;
let gravity = 5;
let jump = false;
let num = 0;
let wing = 0;

let birdImg = [
    "../asset/bird1.jpg",
    "../asset/bird2.jpg",
    "../asset/bird3.jpg",
    "../asset/bird4.jpg"
]

pipe.src = "../asset/pipe.png";

setInterval(function () {
    bird.src = birdImg[wing];
    if (wing < 3) {
        wing++;
    }
    else {
        wing = 0;
    }
}, 100)

setInterval(function () {
    ctx.clearRect(0, 0, 1520, 699);
    ctx.drawImage(bird, birdX, birdY);
    if (!jump) {
        birdY += gravity;
    }
}, 20);

setInterval(function () {
    if (jump) {
        birdY -= 10;
        num++;
    }
    if (num > 10) {
        num = 0;
        jump = false;
    }
}, 10);

function move() {
    jump = true;
}

document.addEventListener("click", move);