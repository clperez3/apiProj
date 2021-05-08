import Game from './engine/game.js'
import GameView from './engine/gameView.js';
import GameController from './engine/controller.js';

import {getNumTrivia, getDoggo, getRecipeByTime, getRecipeByID, getTrivia} from './requests.js';


window.addEventListener('load', async()=>{

    let pickNumDiv = document.createElement('div');
    {
        let label = document.createElement('label');
        label.innerHTML = 'Pick a number between 1 and 10 to begin. The closer the guess, the easier the game! You will get a recipe to make at the end, but the longer the game takes you, the harder the recipe will be to make.';
        label.for = 'pickNum';
        let input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.max = '10';
        input.id = 'pick';
        input.value = '1';
        let button = document.createElement('button');
        button.id = 'submitGuess';
        button.type = 'submit';
        button.innerHTML = 'Guess!';
        $('#main').append(label);
        $('#main').append(document.createElement('div'));
        $('#main').append(input);
        $('#main').append(button);

        $('#submitGuess').on('click', guessClick);


    }


});

function guessClick(){
    $('#gameBoard').children().remove();
    let randomNum = Math.ceil(Math.random()*10);
    let guess = $('#pick')[0].value;
    let diff = Math.abs(randomNum-guess);

    let responseDiv = document.createElement('div');
    responseDiv.id = 'response';

    if(diff ==0){
        responseDiv.innerHTML = 'You guessed it! No work for you <3'
    } else if (diff <=3){
        let num = document.createElement('strong');
        num.innerHTML = randomNum + '.';
  
        responseDiv.innerHTML = 'So close, but the number was ';
        responseDiv.appendChild(num);
        let a = document.createElement('p');
        a.innerHTML = "Good luck! Shouldn't be too bad...";
        responseDiv.append(a);
    } else {
        let num = document.createElement('strong');
        num.innerHTML = randomNum + '.';
  
        responseDiv.innerHTML = 'Nice try, but the number was ';
        responseDiv.appendChild(num);
        let a = document.createElement('p');
        a.innerHTML = 'Good luck!';
        responseDiv.append(a);
    }
    $('#main').append(responseDiv);
    setTimeout(()=>{$('#response').remove();
    generateGame(diff);

}, 1000);
}

async function generateGame(diff){
    if(diff>7){
        diff =6;
    } else if (diff > 4){
        diff = 4;
    } else {
        diff = 4;
    }

    let gameWidth = diff;
    let numOfPairs = gameWidth*gameWidth/2;

    let promptArr = [];
    let ansArr = [];
    let playInfo = document.createElement('div');

    if(diff === 6){
        let min = Math.floor(Math.random()*50);
        let max = min + numOfPairs;
        let request = await getNumTrivia(min,max);
        for(let i=min; i < max; i++){
            let pos = i-min;
            let content = request[i];
            //create prompt
            promptArr[pos] = i;

            //create answer
            let indx = content.indexOf("is");
            ansArr[pos] = content.substring(indx);
            playInfo.innerHTML = 'Match the number trivia question to its answer.'


        }
    } else if(diff === 5){
        let request = await getTrivia();
        let data = request['results'];
        for(let i=0; i<numOfPairs; i++){
            promptArr[i] = data[i]['question'];
            ansArr[i] = data[i]['correct_answer'];
        }
        playInfo.innerHTML = 'Match the trivia question to its answer.'

    } else {
        for(let i=0; i<numOfPairs; i++){
            let request = await getDoggo();
            let content = request['message'];
            promptArr[i] = "<img class='fill' src=" + content+ '>';
            ansArr[i] = "<img class='fill' src="+ content+ '>';

        }
        playInfo.innerHTML = 'Match the dog to its identical picture.'

    }

    $('#gameBoard').append(playInfo);


    let boardGame = new Game(gameWidth);
    let boardView = new GameView(boardGame, promptArr, ansArr);
    let boardControl = new GameController(boardGame, boardView);

    boardGame.onWin(wonGame);
    $('#gameBoard').append(boardView.getView());

}

function wonGame(game){
    setTimeout(()=>{
        $('#gameBoard').children().remove();
        appendWin(game.getTotalMoves());
    },1500);
}

async function appendWin(moves){
    let requesta = await getRecipeByTime(moves*2);

    let data = requesta['results'];
    let recipe = data[0];
    let recipeID = recipe['id'];

    let requestb = await getRecipeByID(recipeID);
    let link = requestb['sourceUrl'];
    let min = requestb['readyInMinutes'];

    let head = document.createElement('h2');
    head.innerHTML = "Good Job! You get to make...";

    let p = document.createElement('h1');
    p.innerHTML = recipe['title'];

    let img = document.createElement('img');
    img.src = recipe['image'];

    let h = document.createElement('p');
    h.innerHTML = 'Ready in ' + min+ ' minutes!';

    let winScreen = document.createElement('a');
    winScreen.id = '#win';
    winScreen.href = link;
    winScreen.appendChild(head);
    winScreen.appendChild(p);
    winScreen.appendChild(img);
    winScreen.appendChild(h);

    $('#gameBoard').append(winScreen);






}