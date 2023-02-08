var canvas = document.getElementById("canvas");
var screenPixels = window.innerWidth*window.innerHeight;
var icon = document.getElementById("icon");

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 8;
ctx.strokeStyle = "#"+Math.floor(Math.random()*16777215).toString(16);

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
if(!isDrawing) return;
    if(state == true){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
}

document.addEventListener('mousedown', (e) => {
    if(state == true){
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

document.addEventListener('mousemove', draw);
document.addEventListener("mouseup", mouseUp);
function mouseUp() {
    if(state == true){
        isDrawing = false;
        calculateFillAmount();
    }
}
//canvas.addEventListener('mouseout', () => isDrawing = false);


var state = false;
var filledPixels = 0;

function calculateFillAmount(){
    console.log("aboba")
    var p = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight).data; 
    for(var i=0; i<p.length; i+=4){
        if(p[i] > 10){
            filledPixels++;
        }
    }
    var percent = (Math.round((filledPixels/screenPixels*100) * 100) / 100)
    document.title = percent+"%";
    changeIcon(percent);
    if(percent == 100){
        finish();
    }
    filledPixels = 0;
}

function changeIcon(p){
    if(p>=10 && p<20){
        icon.setAttribute("href", "icons/10p.png");
    }
    if(p>=20 && p<30){
        icon.setAttribute("href", "icons/20p.png");
    }
    if(p>=30 && p<40){
        icon.setAttribute("href", "icons/30p.png");
    }
    if(p>=40 && p<50){
        icon.setAttribute("href", "icons/40p.png");
    }
    if(p>=50 && p<60){
        icon.setAttribute("href", "icons/50p.png");
    }
    if(p>=60 && p<70){
        icon.setAttribute("href", "icons/60p.png");
    }
    if(p>=70 && p<80){
        icon.setAttribute("href", "icons/70p.png");
    }
    if(p>=80 && p<90){
        icon.setAttribute("href", "icons/80p.png");
    }
    if(p>=90 && p<100){
        icon.setAttribute("href", "icons/90p.png");
    }
    if(p>=100){
        icon.setAttribute("href", "icons/100p.png");
    }
}

var finished = false;
var time = 0;
function addTimer(){
    if(finished == false){
        time += 1;
    }
}



function finish(){
    state = false;
    var endScreen =  document.getElementById("endScreen");
    var text =  document.getElementById("text");
    text.innerHTML = "You have successfully wasted "+(Math.round(((time-3)/60)*100)/100)+" minutes of your time, which no one will return to you :)"
    endScreen.style.opacity = "1";
    endScreen.style.pointerEvents = "auto";
    endScreen.style.userSelect = "auto";
    endScreen.setAttribute("class", "floatIn");
    finished = true;
}

var started = false;
function start(){
    if(started == false){
        var startScreen =  document.getElementById("startScreen");
        startScreen.remove;
        state = true;
        started = true;
    }
}

setInterval(start, 3000)


setInterval(addTimer, 1000);
