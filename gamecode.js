let BlockSize = 50;
let rows = 15;
let columns = 15;
let canvas;
let ctx; 

let SnakeX = BlockSize * 5;
let SnakeY = BlockSize * 5;

let death = false;

//speelveld 

window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = rows * BlockSize;
    canvas.width = columns * BlockSize;
    ctx = canvas.getContext("2d"); 

    AppleBlock();
    document.addEventListener("keyup", SnakeMovement);
    setInterval(update, 750/10); 
};

let TempoX = 0;
let TempoY = 0;

//keys voor de slang om te bewegen

function SnakeMovement(e) {
    if (e.code == "ArrowUp") {
        TempoX = 0;
        TempoY = -1;
    }
    else if (e.code == "ArrowDown") {
        TempoX = 0;
        TempoY = 1;
    }
    else if (e.code == "ArrowLeft") {
        TempoX = -1;
        TempoY = 0;
    }
    else if (e.code == "ArrowRight") {
        TempoX = 1;
        TempoY = 0;
    }
}

let AppleX;
let AppleY;

//appel RNG

function AppleBlock() {
    AppleX = Math.floor(Math.random() * columns) * BlockSize;
    AppleY = Math.floor(Math.random() * rows) * BlockSize;
}

function update() {
    if (death) {
        return;
    }

    //placements voor slang en appel

    ctx.fillStyle="black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle="red";
    ctx.fillRect(AppleX, AppleY, BlockSize, BlockSize);

    //appel replacement
    if (SnakeX == AppleX && SnakeY == AppleY) {
        AppleBlock();
    }
    
    ctx.fillStyle="blue";
    SnakeX += TempoX * BlockSize;
    SnakeY += TempoY * BlockSize;
    ctx.fillRect(SnakeX, SnakeY, BlockSize, BlockSize);

    //slang gaat dood als hij uit de border gaat

    if (SnakeX < 0 || SnakeX > columns*BlockSize || SnakeY < 0 || SnakeY > rows*BlockSize) {
        death = true;
    }
}

