var option = null;
var animate ;
let mov=0;
var playMove=true;

var humanOption = null;
var pcOption = null;

var humanItem = null;
var pcItem = null;

var humanScore = 0;
var pcScore=0;

const WIN="#99e699";
const LOST="#dc143c";
const BTNBCKGROUND = "#a4b6ce";
const MSGBCKGROUND ="#448dee";

function playAgain(){
    document.getElementById(humanItem).style.left = '0px';
    document.getElementById(pcItem).style.left = '590px';
    document.getElementById(humanItem).style.backgroundColor = BTNBCKGROUND;    
    document.getElementById(pcItem).style.backgroundColor = BTNBCKGROUND;
    document.getElementById('divMsg').style.backgroundColor = MSGBCKGROUND;
    document.getElementById('msg').innerHTML=''; 
    playMove=true;
}

function getComputerChoice(){
    let choice = Math.floor(Math.random() * 3);
    switch(choice){
        case 0:
            playPC('pcrock');
            return 'Rock';
        case 1:
            playPC('pcpaper');
            return 'Paper';
        case 2:
            playPC('pcscissors');
            return 'Scissors';
    }
}

function playRound(playerSelection,computerSelection){  
    pcOption=computerSelection.toUpperCase();
   
    switch(computerSelection.toUpperCase()){
        case 'ROCK':
            if(playerSelection.toUpperCase()=='PAPER'){                
                return 'W';
            }
            else if(playerSelection.toUpperCase()=='SCISSORS'){
                return 'L';
            }
            else{
                return 'T'; 
            }                
        case 'PAPER':
            if(playerSelection.toUpperCase()=='ROCK'){
                return 'L';
            }
            else if(playerSelection.toUpperCase()=='SCISSORS'){
                return 'W';
            }
            else{
                return 'T'; 
            }   
        case 'SCISSORS':
            if(playerSelection.toUpperCase()=='ROCK'){
                return 'W';
            }
            else if(playerSelection.toUpperCase()=='PAPER'){
                return 'L';
            }
            else{
                return 'T'; 
            }   
    }  
}
function play(opcion){    
    playMove=false;
    return playRound(opcion, getComputerChoice());
}

/******************************************************************************************************/

function playHuman(objSource){    
    if(playMove==true){
        humanItem = objSource;
        mov=0;
        option = document.getElementById(objSource);
        option.style.position= 'relative'; 
        option.style.left = '0px';  
        moveRight();  
    }   
}

function playPC(objSource){
    mov=0;
    pcItem = objSource;
    option = document.getElementById(objSource);
    option.style.position= 'relative'; 
    option.style.left = '500px';     
    pcOption=option;
    moveLeft();
}

function moveLeft(){
    if(mov<20){
        option.style.left = parseInt(option.style.left) - 10 + 'px';
        animate = setTimeout(moveLeft,20);  
        mov++;
    }else{
        clearTimeout(animate);
    }
}

function moveRight(){
    if(mov<20){      
        option.style.left = option.offsetLeft + 10 + 'px';
        animate = setTimeout(moveRight,20); 
        mov++;
    }
    else{
        clearTimeout(animate);        
        humanOption=option.id.replace('player','').toUpperCase();
        let result = play(option.id.replace('player',''));  
        let winner = null;
        let looser = null;
        let msg = null;
        switch (result){
            case 'W':
                humanScore+=1;
                winner = humanOption;
                looser = pcOption;
                msg =`You Win! ${humanOption} beats ${pcOption}.`;
                document.getElementById(humanItem).style.backgroundColor = WIN;                
                document.getElementById('divMsg').style.backgroundColor = WIN;
                document.getElementById(pcItem).style.backgroundColor = LOST;
                break;
            case 'L':
                pcScore+=1;
                winner = pcOption;
                looser = humanOption;
                msg = `You Lose!  ${pcOption} beats ${humanOption}.`;
                document.getElementById(humanItem).style.backgroundColor = LOST;
                document.getElementById('divMsg').style.backgroundColor = LOST;
                document.getElementById(pcItem).style.backgroundColor = WIN;
                break;
            case 'T':
                msg = `${humanOption} ties with  ${pcOption}.`
                break;
        } 
        document.getElementById('scorePlayer').innerHTML=humanScore;
        document.getElementById('scorePC').innerHTML=pcScore;
        document.getElementById('msg').innerHTML=msg;   
    }    
}

function reset(){      
    playAgain();
    humanScore = 0;
    pcScore = 0;
    document.getElementById('scorePlayer').innerHTML=humanScore;
    document.getElementById('scorePC').innerHTML=pcScore;    
} 