
export default class GameView{

    constructor(game, prompts, ans){
        let size = game.getBoard().length;
        let board = game.getBoard();
        let width = Math.sqrt(size);
        let boardTable = document.createElement('table');

        let hasPlacedPrompt = new Array (size/2);
        let hasPlacedAnswer = new Array (size/2);
        this.contents = new Array(size);

        hasPlacedPrompt.fill(false);
        hasPlacedAnswer.fill(false);

        for(let i=0; i<width; i++){
            let tr = document.createElement('tr');
            for(let j=0; j<width; j++){
                let pos = i*width+j;
                let td = document.createElement('td');
                td.className = 'cell';
                td.id = pos;
                let content;


                if(!hasPlacedPrompt[board[pos]] && !hasPlacedAnswer[board[pos]]){
                    let p = Math.random();
                    if(p>.5){
                        hasPlacedPrompt[board[pos]] = true;
                        content = prompts[board[pos]];
                    } else {
                        hasPlacedAnswer[board[pos]] = true;
                        content = ans[board[pos]];

                    }

                } else if (!hasPlacedPrompt[board[pos]]){
                    hasPlacedPrompt[board[pos]] = true;
                    content = prompts[board[pos]];
                } else {
                    hasPlacedAnswer[board[pos]] = true;
                    content = ans[board[pos]];
                }

                td.innerHTML = '';
                this.contents[pos] = content;
                if(!game.getRevealed(pos)){
                    td.style.backgroundColor = 'red';
                }
                tr.appendChild(td);

            }
            boardTable.appendChild(tr);
        }
        this.model = game;
        this.listeners = [];
        
        let scoreBoard = document.createElement('div');
        scoreBoard.id = 'scoreBoard';
        scoreBoard.innerHTML = 'Total Moves Played';
        let score = document.createElement('div');
        score.id = 'score';
        score.innerHTML = game.getTotalMoves();
        scoreBoard.appendChild(score);
        $('#gameBoard').append(boardTable);

        $('#gameBoard').append(scoreBoard);
        this.div = $('#gameBoard')[0];
        $('td').on('click', this, this.revealCell);

    }
    getModel(){
        return this.model;
    }
    revealCell(e){
        let pos = this.id;
        let view = e.data;
        this.innerHTML = view.contents[pos];
        this.style.backgroundColor = 'white';
        view.updateListeners(pos);

    }
    updateListeners(pos){
        this.listeners.forEach(listener => {
            listener.update(pos);
        });
    }
    addListener(l){
        this.listeners.push(l);
    }

    getView(){

        return this.div;
    }
    update(e){
        let size = e.getBoard().length;
        for(let i=0; i<size; i++){
            let cell = $('#'+i)[0];
            if(this.model.getRevealed(i)){
                cell.style.backgroundColor = 'white';
                cell.innerHTML = this.contents[i];
            } else {
                cell.style.backgroundColor = 'red';
                cell.innerHTML = '';


            }
        }
        $('#score')[0].innerHTML = this.model.getTotalMoves();    
    }


}