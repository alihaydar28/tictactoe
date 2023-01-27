
const container=document.querySelector('.container');


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


let p=["z","z","z","z","z","z","z","z","z"];

function winner(c){
    if(p[0]===c && p[1]===c && p[2]===c || p[3]===c && p[4]===c & p[5]===c || p[6]===c && p[7]===c && p[9]===c || p[0]===c && p[3]===c && p[6]===c 
        || p[1]===c && p[4]===c && p[7]===c || p[2]===c && p[5]===c && p[8]===c || p[0]===c && p[4]===c && p[8]===c || p[02]===c && p[4]===c && p[6]===c){
        console.log("true winner is "+ c);
        return true;
    }
    else{
        console.log("false no winner");
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

function reset(t){
    t=1;
    for(let i=0; i<p.length;i++){
        p[i]="z";
    }
}

const ali= Player("ali","X");
const rawan =Player("rawan","O");
let turn=1;
let choice="";


container.addEventListener('click',function(e){
    if(e.target.classList.contains('btn')){
        let a=e.target.classList;
        let b=e.target;
        
        /*
        console.log(a[1]);
        let c=position(a[1]);
        */
        if(b.innerHTML==""){
            if(turn===1){
                choice=ali.getChoice();
                b.innerHTML=choice;
                c=c-1;
                p[c]=choice;
                turn=2;
                if(winner(choice)){
                    turn=3;
                    ali.setScore(); 
                }
            }
            else if(turn===2){
                choice=rawan.getChoice();
                c=c-1;
                b.innerHTML=choice;
                p[c]=choice;
                turn=1;
                if(winner(choice)){
                    rawan.setScore();
                    turn=3;
                }
            }
        }
    }
   
});


