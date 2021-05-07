import {getVegan} from '/requests.js'
import Game from './engine/game.js'
import GameView from './engine/gameView.js';
import GameController from './engine/controller.js';
window.addEventListener('load', async()=>{

    let pickNumDiv = document.createElement('div');
    {
        let label = document.createElement('label');
        label.innerHTML = 'Pick a number between 1 and 10. The closer the number, the easier the game!';
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
        $('#main').append(input);
        $('#main').append(button);

        $('#submitGuess').on('click', guessClick);


    }

    // let request = await getVegan();

    // let data = await request.data['results'];
    // alert(data.length);
    // data.forEach(recipe => {
    //     let p = document.createElement('p');
    //     p.innerHTML = recipe.title;
    //     $('#content').append(p);
    // });
});

function guessClick(){
    $('#gameBoard').children().remove();
    let randomNum = Math.floor(Math.random()*10);
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

function generateGame(diff){
    let boardGame = new Game(diff);
    let boardView = new GameView(boardGame);
    let boardControl = new GameController(boardGame, boardView);


    $('#gameBoard').append(boardView.getView());

}