const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let bird = new Image();
let pipe = new Image();
let birdX = 100;
let birdY = 100;
let gravity = 5;
let jump = false;
let wing = 0;
let game = false;

let birdImg = [
    "../asset/bird1.jpg",
    "../asset/bird2.jpg",
    "../asset/bird3.jpg",
    "../asset/bird4.jpg"
]

pipe.src = "../asset/pipe.png";

function play() {
    let num = 0;
    game = true;
    setInterval(function () {
        if (game) {
            ctx.clearRect(0, 0, 1520, 600);
            ctx.drawImage(bird, birdX, birdY);
            if (!jump) {
                birdY += gravity;
            }
        }
        if (birdY < -40 || birdY > 450) {
            game = false;
        }
    }, 20);

    setInterval(function () {
        if (game) {
            if (jump) {
                birdY -= 10;
                num++;
            }
            if (num > 10) {
                num = 0;
                jump = false;
            }
        }
    }, 10);
}

setInterval(function () {
    bird.src = birdImg[wing];
    if (wing < 3) {
        wing++;
    }
    else {
        wing = 0;
    }
    ctx.drawImage(bird, birdX, birdY);
}, 100)

function keyEvent(event) {
    if (event.key == 'Escape' && birdY > -40 && birdY < 450) {
        game = false;
    }
    if (event.key == 'Enter' && birdY > -40 && birdY < 450) {
        game = true;
    }
    if (event.key == 'r') {
        location.reload();
    }
}

function move() {
    jump = true;
}

document.addEventListener("keydown", keyEvent);
document.getElementById('playGame').addEventListener('click', play);
document.addEventListener("click", move);