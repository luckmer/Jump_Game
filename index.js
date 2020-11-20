document.addEventListener("DOMContentLoaded", () =>{
    const game = document.querySelector(".game");
    let panels = 5;

    const  GeneratePanel = ()=> {
        for (let i = 1; i < panels + 1; i++) {
            const Div = document.createElement("div");
            Div.innerText = i;
            Div.classList.add("Contrast");
            game.appendChild(Div);
        }
    }

    const MoveRight = () =>{
        
    }
    const MoveLeft = () =>{
        
    }
    

    const  Joystick = (e) => {
        if (e.keyCode === 68) {
            MoveRight();
        } else if (e.keyCode === 65) {
            MoveLeft();
        }
    }
    
    GeneratePanel();
    document.addEventListener("keyup",Joystick)
});