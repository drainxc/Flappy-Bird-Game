const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1520;
canvas.height = 600;

let bird = new Image();
let pipe = new Image();
let reversePipe = new Image();
let birdX = 100;
let birdY = 300;
let gravity = 7;
let jump = false;
let wing = 0;
let game = false;
let pipeX = 1520;
let pipeY = 350;

let birdImg = [
    "../asset/bird1.jpg",
    "../asset/bird2.jpg",
    "../asset/bird3.jpg",
    "../asset/bird4.jpg"
];
let pipeImg = [
    "../asset/pipe.png",
    "../asset/reversePipe.png"
];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function oneTimeListener(element, type, callback) {
    element.addEventListener(type, function () {
        element.removeEventListener(type, arguments.callee);
        return callback();
    });
}

oneTimeListener(document.getElementById('playGame'), 'click', function () {
    let num = 0;
    game = true;
    setInterval(function () {
        if (game) {
            if (jump) {
                birdY -= 10;
                num++;
            }
            if (num > 15) {
                num = 0;
                jump = false;
            }
        }
        pipeX -= 5;
    }, 10);

    setInterval(function () {
        if (game) {
            pipe.src = pipeImg[0];
            reversePipe.src = pipeImg[1];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bird, birdX, birdY);
            ctx.drawImage(pipe, pipeX, pipeY);
            ctx.drawImage(reversePipe, pipeX, pipeY - 700);
            if (!jump) {
                birdY += gravity;
            }
        }
        if (birdY < -17.5 || birdY > 475) {
            game = false;
        }
    }, 20);

    setInterval(function () {
        pipeY = getRandomIntInclusive(250, 550);
        if (pipeX < 0) {
            pipeX = 1520;
        }
    }, 3200);
});

setInterval(function () {
    bird.src = birdImg[wing];
    if (wing < 3) {
        wing++;
    }
    else {
        wing = 0;
    }
}, 100)

function keyEvent(event) {
    if (event.key == 'Escape' && birdY > -17.5 && birdY < 475) {
        game = false;
    }
    if (event.key == 'Enter' && birdY > -17.5 && birdY < 475) {
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
document.addEventListener("click", move);