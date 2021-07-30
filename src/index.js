const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let bird = new Image();
let pipe = new Image();
let birdX = 100;
let birdY = 100;
let gravity = 6;
let num = 0;
let jump = false;

bird.src = "../asset/bird.png";
pipe.src = "../asset/pipe.png";

setInterval(function () {
    ctx.clearRect(0, 0, 1520, 699);
    ctx.drawImage(bird, birdX, birdY);
    if (!jump) {
        birdY += gravity;
    }
}, 20);

setInterval (function () {
        if (jump) {
           birdY -=10;
            num++; 
        }
        if (num > 10) {
            num = 0;
            jump = false;
        }
    }, 20);

function move() {
    jump = true;
}

document.addEventListener("click", move);