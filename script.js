//let p1="Z",p2="Z",p3="Z",p4="Z",p5="Z",p6="Z",p7="Z",p8="Z",p9="Z";
let p=["z","z","z","z","z","z","z","z","z"];
console.log(p[2]);
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

//winner("Z");

const Player =(name , choice) =>{
    let score=0;
    const getName =() => name;
    const getScore=()=> score;
    const getChoice = () => choice;
    const setScore= ()=>{
        score++;
    };
    return {getName,getScore,getChoice,setScore};
};

const ali= Player("ali","X");
const rawan =Player("rawan","O");

let turn =1;
let choice="Z";
function play(){ 
    for(let i=0; i<9;i++){
        if(turn ===1){
            
        choice=ali.getChoice();
            let c = prompt(ali.getName()+ " enter place");
            c=c-1;
            while(p[c]!=="z"){
                c = prompt(ali.getName()+ " enter place");
                c=c-1;
            }
            p[c]=choice;
            if(winner(choice)===true){
                ali.setScore();
                break;
            }
        turn =2;
        }else if(turn ===2){
            choice=rawan.getChoice();
            let c = prompt(rawan.getName()+" enter place");
            c=c-1;
            while(!(p[c]==="z")){
                c = prompt(rawan.getName()+" enter place");
                c=c-1;
            }
            p[c]=choice;
            if(winner(choice)===true){
                rawan.setScore();
                break;
            }
        turn =1;
        }
    }
    reset();
}

function reset(){
    for(let i=0; i<p.length;i++){
        p[i]="z";
    }
}