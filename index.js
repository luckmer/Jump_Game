const game = document.querySelector(".game");
const character = document.querySelector(".character");
const Play = document.querySelector("button");
let isGoing = false;
let leftTimerId;
let rightTimerId;
let left = 0;
let gravity = 0.9 ; 
let jump = 0;
let bottom = 0;
let test = 0
let active = test
let TestLeft = left;
let table = [];

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
        table.push(test)
    })
}

const Platform = () =>{
    for (let i = 0; i < table.length; i++){
        MovePlatformDown(i);
        CreateNewPlatform(i);
    }
}

const  JumpCharacter =() => {
    let upTimerId = setInterval(function (){
        if (bottom > 250) {
            active -= 20;

            clearInterval(upTimerId);
            let downTimerId = setInterval(function () {
                if (bottom < 0) {
                    clearInterval(downTimerId);
                }
                active -= 40;
                bottom -= 5;
                Collision(active,TestLeft);
                bottom = bottom * gravity;
                character.style.bottom = bottom + "px";
            }, 20);
        };
        active += 30;
        bottom += 30;
        bottom = bottom * gravity;
        character.style.bottom = bottom + "px";
    }, 20);
}


const Collision = (top,TestLeft) =>{
    table.forEach(item =>{
        
        let colider = item.left;
        let first = table[0].left;
        let bottom = item.bottom;
        if (
            top >= bottom && 
            top <= bottom + 85 
        
        ) {
            console.log(top,TestLeft)
        };

    });
};
const MoveLeft = () =>{
    if (isGoing == false) { 
        clearInterval(rightTimerId)
    } 
    leftTimerId = setInterval(function () {
        TestLeft -= 5;     
        TestLeft < 0 ? ClearRightInterval() : [];
        character.style.left = TestLeft + "px";
    }, 20);
}

const MoveRight = () =>{
    if (isGoing == false) {
        clearInterval(leftTimerId)
    } 
    rightTimerId = setInterval(function (){
        TestLeft += 5;
        TestLeft > 280 ? ClearState() : [];
        character.style.left = TestLeft + "px";
    }, 20);    
}

const  CreateNewPlatform = (i) => {
    if (table[i].bottom < 10) {
        table[0].visual.classList.remove("platform");
        table.shift();
        let test = new SS(600);
        table.push(test);
    }
}

const  MovePlatformDown =(i) => {
    if (active > 20000) {
        table[i].bottom -= 4;
        table[i].visual.style.bottom = table[i].bottom + "px";
    }
}

const  Joystick = (e) => {
    if (e.keyCode === 68 ) {
        MoveRight(left);
    } else if (e.keyCode === 65 ) {
        MoveLeft(left);
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

function Start(){


}

CreatePlatform();
setInterval(Platform,20)


Play.addEventListener("click", Start);
document.addEventListener("keyup", Joystick)
document.addEventListener("keydown", () =>{})
