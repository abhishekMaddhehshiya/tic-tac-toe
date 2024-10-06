const gameInfo = document.querySelector(".gameinfo");
const newGame = document.querySelector(".newgame");
const boxes = document.querySelectorAll(".box");
let currPlayer;
let gameGrid;
let count;
function initGame(){
    gameGrid = ["","","","","","","","",""];
    currPlayer = true;
    count = 0;
    setGameInfo(currPlayer);
    newGame.classList.remove("active");
    gameInfo.classList.remove("transition");
    boxes.forEach((box,index) =>{
        box.innerText = "";
        box.classList.remove("win");
        boxes[index].style.pointerEvents = "all";
    })
}
initGame();

function setGameInfo(currPlayer){
    if(currPlayer == true){
        gameInfo.innerText = "current player: x";
    }
    else{
        gameInfo.innerText = "current player: o";
    }
}

const winPositions = [
    [0,1,2], [3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]

function chaekGameOver(){
    winPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" ||gameGrid[position[1]] !== "" ||gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            gameInfo.innerText = `winner player: ${gameGrid[position[0]]}`;
            gameInfo.classList.add("transition");
            newGame.classList.add("active");
            
        }
    })
    if(count == 9){
        gameInfo.innerText = `game tied!`;
        gameInfo.classList.add("transition");
        newGame.classList.add("active");
    }
}



boxes.forEach((box,index) => {
    box.addEventListener('click', ()=>{
        if(gameGrid[index] === ""){
            count++;
            if(currPlayer){
                box.innerText = "x";
                gameGrid[index] = "x";
            }
            else{
                box.innerText = "o";
                gameGrid[index]= "o";
            }
            boxes[index].style.pointerEvents = "none";
            currPlayer = !currPlayer;
            setGameInfo(currPlayer);
            chaekGameOver();
        }
    })
});

newGame.addEventListener('click',()=>{
    initGame();
})


