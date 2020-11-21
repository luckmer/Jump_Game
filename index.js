const game = document.querySelector(".game");
const character = document.querySelector(".character");
let panelS = 5;
let PlayerBottom = 0;
let MoveControl = 300;
let isGoing = false;
let leftTimerId;
let rightTimerId;
let width = 300;
let left = 0;
let gravity = 0.9 ; 
let Value = 0
let platGap = 300;
let jump = 0;
let bottom = 0;


let startPoint = 150
let doodlerBottomSpace = startPoint

function createPlatforms(){
    for (let i = 0; i < 6; i++) {
        let platGap = 700 / 6
        let newPlatBottom = 100 + i * platGap
        Platform(newPlatBottom)
    }
}
createPlatforms()


function Platform(Proportions){
    let h = Math.floor(Math.random() * 4),
        top = h * 70  ,
        bottom = Proportions,
        visual = document.createElement("div");
        visual.classList.add("platform");
        visual.style.left = top + "px";
        visual.style.top= bottom + "px";
        function MoveBlock(){
            if (doodlerBottomSpace > 200) {
                bottom += 4
                visual.style.left = top + "px";
                visual.style.top = bottom + "px";

                console.log(bottom  )
            }
    }
    setInterval(MoveBlock,30)

    game.appendChild(visual);
}

function JumpCharacter(){
    let upTimerId = setInterval(function () {
        if (bottom > 250) {
            clearInterval(upTimerId);
            let downTimerId = setInterval(function () {
                if (bottom < 0) {
                    clearInterval(downTimerId);
                }
                bottom -= 5;
                doodlerBottomSpace = 150;
                bottom = bottom * gravity;
                character.style.bottom = bottom + "px";

                if (bottom < 10) {
                    Platform()
                }
            }, 20);
        }

        doodlerBottomSpace += 30;
        bottom += 30;
        bottom = bottom * gravity;
        character.style.bottom = bottom + "px";
    }, 20);
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

const  Joystick = (e) => {
    if (e.keyCode === 68 ) {
        MoveRight();
    } else if (e.keyCode === 65 ) {
        MoveLeft();
    } else if (e.keyCode === 32) {
        JumpCharacter(startPoint);
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




