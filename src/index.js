const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let bird = new Image();
let pipe = new Image();
let birdX = 100;
let birdY = 100;

bird.src = "../asset/bird.png";
pipe.src = "../asset/pipe.png";

bird.onload = function(){ 
    ctx.drawImage(bird, birdX, birdY); 
}