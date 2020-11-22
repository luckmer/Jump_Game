const game = document.querySelector(".game");
const character = document.querySelector(".character");
let isGoing = false;
let leftTimerId;
let rightTimerId;
let left = 0;
let gravity = 0.9 ; 
let jump = 0;
let bottom = 0;
let test = 0
let active = test
let platforms = [];


const SS = function(Gap){
    this.left  = Math.random() * 315  ; 
    this.bottom = Gap;
    this.visual = document.createElement('div');
    const visual = this.visual;
    const bottom = this.bottom;
    const left = this.left
    visual.classList.add('platform')
    visual.style.left = left + 'px'
    visual.style.bottom = bottom + 'px'
    game.appendChild(visual)
}

const  CreatePlatform = () =>  {
    let plat = [0,1,2,3,4];
    plat.forEach(i =>{
        let Gap = 100 + i * 120
        let test = new SS(Gap);
        platforms.push(test)
    })
}

const Platform = () =>{
    for (let i = 0; i < platforms.length; i++){
        MovePlatformDown(i);
        CreateNewPlatform(i);
    }
}

const  JumpCharacter =() => {
    let upTimerId = setInterval(function (){
        if (active === 900) {
            setTimeout(Platform(600),1 )
        }
        if (bottom > 250) {
            active -= 20;
            clearInterval(upTimerId);
            let downTimerId = setInterval(function () {
                if (bottom < 0) {
                    clearInterval(downTimerId);
                }
                active -= 40;
                bottom -= 5;
                bottom = bottom * gravity;
                character.style.bottom = bottom + "px";
            }, 20);
        }
        active += 30
        bottom += 30;
        bottom = bottom * gravity;
        character.style.bottom = bottom + "px";
        Collision(active);

    }, 20);
}


const Collision = (active) =>{


}

const MoveLeft = () =>{
    if (isGoing == false) { 
        clearInterval(rightTimerId)
    } 
    leftTimerId = setInterval(function () {
        left -= 5;     
        left < 0 ? ClearRightInterval() : [];
        character.style.left = left + "px";
    }, 20);
}

const MoveRight = () =>{
    if (isGoing == false) {
        clearInterval(leftTimerId)
    } 
    rightTimerId = setInterval(function (){
        left += 5;
        left > 280 ? ClearState() : [];
        character.style.left = left + "px";
    }, 20);    
}

const  CreateNewPlatform = (i) => {
    if (platforms[i].bottom < 10) {
        platforms[0].visual.classList.remove("platform");
        platforms.shift();
        let test = new SS(600);
        platforms.push(test);
    }
}

const  MovePlatformDown =(i) => {
    if (active > 20) {
        platforms[i].bottom -= 4;
        platforms[i].visual.style.bottom = platforms[i].bottom + "px";
    }
}

const  Joystick = (e) => {
    if (e.keyCode === 68 ) {
        MoveRight();
    } else if (e.keyCode === 65 ) {
        MoveLeft();
    } else if (e.keyCode === 32) {
        JumpCharacter(test);
    }
}

function ClearRightInterval(){
    left = 0;
    clearInterval(leftTimerId)
}

function ClearState(){
    left = 280;
    clearInterval(rightTimerId);
}

document.addEventListener("keyup", Joystick)
CreatePlatform();
setInterval(Platform,20)
