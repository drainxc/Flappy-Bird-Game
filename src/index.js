const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1520;
canvas.height = 598;
ctx.lineWidth = 8;
ctx.font = "40pt BM YEONSUNG OTF";
ctx.fillStyle = 'white';

let bird = new Image();
let pipe = new Image();
let reversePipe = new Image();
let background = new Image();
let floor = new Image();
let birdX = 100;
let birdY = 250;
let gravity = 8;
let jump = false;
let wing = 0;
let winging = true;
let game = false;
let pipeX = 1520;
let pipeY = 350;
let floorX = 0;
let point = 0;

let birdImg = [
    "../asset/bird1.png",
    "../asset/bird2.png",
    "../asset/bird3.png",
    "../asset/bird4.png"
]; // 플레이어 애니메이션
let pipeImg = [
    "../asset/pipe.png",
    "../asset/reversePipe.png"
]; // 파이프 이미지
background.src = "../asset/background.png"; // 배경 이미지
floor.src = "../asset/floor.png"; // 바닥 이미지


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} // 랜덤

function oneTimeListener(element, type, callback) {
    element.addEventListener(type, function () {
        element.removeEventListener(type, arguments.callee);
        return callback();
    });
} // 한 번만 실행

oneTimeListener(document.getElementById('playGame'), 'click', function () {
    let num = 17;
    game = true;
    setInterval(function () {
        if (game) {
            if (jump) {
                birdY -= num;
                num--;
                gravity = 0;
            }
            if (num <= 0) {
                gravity = 8;
                num = 17;
                jump = false;
            } // 클릭했을 시 점프 애니메이션
            pipeX -= 5;
            floorX -= 5; // 파이프 이동
        }
        
        if (pipeX < 0) {
            pipeY = getRandomIntInclusive(250, 475);
            pipeX = 1520;
        }
        if (floorX < -1520) {
            floorX = 0;
        } // 파이프 생성
        if (birdX == pipeX) {
            point++;
        }
    }, 10);

    setInterval(function () {
        if (game) {
            pipe.src = pipeImg[0];
            reversePipe.src = pipeImg[1]; // 파이프 생성
            draw();
            if (!jump) {
                birdY += gravity;
            } // 플레이어 중력 작용
        }
        if (birdY > 448 || birdX <= pipeX + 50 && birdX >= pipeX - 100 && (birdY >= pipeY - 50 || birdY <= pipeY - 250)) {
            game = false;
            winging = false;
        } // 게임 오버
    }, 20);
});

setInterval(function () {
    if (winging) {
        bird.src = birdImg[wing];
        draw();
        if (wing < 3) {
            wing++;
        }
        else {
            wing = 0;
        }
    } // 애니메이션 삽입
}, 100)

function keyEvent(event) {
    console.log('asdf');
    if (event.key == 'Escape' && birdY < 448) {
        game = false;
    }
    if (event.key == 'Enter' && birdY < 448) {
        game = true;
    } // 게임 멈춤 & 스타트
    if (event.key == 'r') {
        location.reload();
    } // 다시 시작
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, -25);
    ctx.drawImage(pipe, pipeX, pipeY);
    ctx.drawImage(reversePipe, pipeX, pipeY - 700);
    ctx.drawImage(bird, birdX, birdY);
    ctx.drawImage(floor, floorX, 523);
    ctx.strokeText(point , 760, 100);
    ctx.fillText(point, 760, 100);
}

function move() {
    if (birdY > -150) {
        jump = true;
    }
} // 클릭 시 이벤트

document.addEventListener("keydown", keyEvent);
canvas.addEventListener("click", move);