
"use strict";
const container=document.querySelector('.container');
const btns= document.querySelectorAll('.btn');
const restartBtn=document.querySelector('.restartBtn');
const playerTurnTitle=document.querySelector('.title');

const Player =(name , choice) =>{
    let score=0;
    const getName =() => name;
    const getChoice = () => choice;
    const getScore=()=> score;
    const setScore= ()=>{
        score++;
    };
    return {getName,getScore,getChoice,setScore};
};


//let p=["z","z","z","z","z","z","z","z","z"];
let p = new Array(9).fill("z");

function winner(c){
    if(p[0]===c && p[1]===c && p[2]===c || p[3]===c && p[4]===c & p[5]===c || p[6]===c && p[7]===c && p[9]===c || p[0]===c && p[3]===c && p[6]===c 
        || p[1]===c && p[4]===c && p[7]===c || p[2]===c && p[5]===c && p[8]===c || p[0]===c && p[4]===c && p[8]===c || p[2]===c && p[4]===c && p[6]===c){
        console.log("true winner is "+ c);
        return true;
    }
    else{
        
        return false;
    }
}

function position(nb){
    if(nb==="b1"){
        return 1;
    }else if(nb==="b2"){
        return 4;
    }else if(nb==="b3"){
        return 7;
    }else if(nb==="b4"){
        return 2;
    }else if(nb==="b5"){
        return 5;
    }else if(nb==="b6"){
        return 8;
    }else if(nb==="b7"){
        return 3;
    }else if(nb==="b8"){
        return 6;
    }else if(nb==="b9"){
        return 9;
    }
}

function checkForTie(){
    for(let i=0; i<p.length;i++){
        if(p[i]==="z"){
            return false;
        }
    }
    return true;
}

const ali= Player("ali","X");
const rawan =Player("rawan","O");
let turn=1;
let choice="";


container.addEventListener('click',function(e){
    if(e.target.classList.contains('btn')){
        let a=e.target.classList;
        let b=e.target;
        let c=position(a[1]);
        
        if(b.innerHTML==""){
            if(turn===1){
                playerTurnTitle.textContent=rawan.getName()+"'s turn";
                choice=ali.getChoice();
                b.innerHTML=choice;
                c=c-1;
                p[c]=choice;
                turn=2;
                if(winner(choice)){
                    turn=3;
                    ali.setScore();
                    playerTurnTitle.textContent="game over! "+ali.getName()+" won!"; 
                }else if(checkForTie()){
                    turn=3;
                    playerTurnTitle.textContent="TIE! play again!";
                }
            }
            else if(turn===2){
                playerTurnTitle.textContent=ali.getName()+"'s turn";
                choice=rawan.getChoice();
                c=c-1;
                b.innerHTML=choice;
                p[c]=choice;
                turn=1;
                if(winner(choice)){
                    rawan.setScore();
                    turn=3;
                    playerTurnTitle.textContent="game over! "+ rawan.getName()+" won!";
                }else if(checkForTie()){
                    turn=3;
                    playerTurnTitle.textContent="TIE! play again!";
                }
            }
        }
    }
   
});

restartBtn.addEventListener('click', function() {
    for(let i=0; i<p.length;i++){
        p[i]="z";
    }
    btns.forEach(btn=> btn.innerHTML="");
    playerTurnTitle.textContent="press to start game";
    turn=1;
    i=0;
});


/*
"use strict";

const Player=(name,sign)=>{
    //this.sign=sign;
    //this.name=name;

    const getName =() => name;
    /* another longer way
    const getName=()=>{
        return name;
    }
    
    const getSign=()=>{
        return sign;
    }
    return {getSign , getName};
};

const gameBoard = (()=>{ // hon gameBoard huwe object
    const board=["","","","","","","","",""];

    const setField=(index,sign)=>{
        if(index > board.length) return;
        board[index]=sign;
    };

    const getField=(index)=>{
        if(index > board.length) return;
        return board[index];
    };

    const reset = function(){
        for(let i=0;i<board.length;i++){
            board[i]="";
        }
    };

    return { setField, getField , reset};

})();

const gameController = (()=>{

    const playerX = Player("ali","X");
    const playerO = Player("rawan","O");
    let round=1;
    let isOver=false;

    const getIsOver = () =>{
        return isOver;
    };

    const reset = ()=>{
        round=1;
        isOver = false;
    }

    const getCurrentPlayerSign = () =>{
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign(); 
    };

    const checkWinner = (fieldIndex)=>{
        const winConditions=[
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
        ];

        return winConditions.filter((combination)=>combination.includes(fieldIndex))
        .some((possibleCombination) => 
            possibleCombination.every((index)=>gameBoard.getField(index)=== getCurrentPlayerSign())
        );
    };

    const playRound = (fieldIndex)=>{
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        if(checkWinner(fieldIndex)){
            displayController.setResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        if(round ===9){
            displayController.setResultMessage("draw");
            isOver=true;
            return;
        }
        round++;
        displayController.setMessageElement(
            `Player ${getCurrentPlayerSign()}'s turn`
        );
    };

    return {playRound , getIsOver , reset};
})();





const displayController = (() =>{
    const fieldElements= document.querySelectorAll('.btn');
    const restartButton=document.querySelector('.restartBtn');
    const messageElement=document.querySelector('.title');

    fieldElements.forEach((field) =>
        field.addEventListener("click",(e)=>{
            if(gameController.getIsOver() || e.target.textContent !=="") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    );

    restartButton.addEventListener("click", (e) => {
        gameBoard.reset();
        gameController.reset();
        updateGameboard();
        setMessageElement("Player X's turn");
      });
    
      const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
          fieldElements[i].textContent = gameBoard.getField(i);
        }
      };
    
      const setResultMessage = (winner) => {
        if (winner === "Draw") {
          setMessageElement("It's a draw!");
        } else {
          setMessageElement(`Player ${winner} has won!`);
        }
      };
    
      const setMessageElement = (message) => {
        messageElement.textContent = message;
      };
    
      return { setResultMessage, setMessageElement };
    })();
*/