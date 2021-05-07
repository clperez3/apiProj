export default class GameView{
    constructor(game){
        let size = game.getBoard().length;
        let board = game.getBoard();
        let width = Math.sqrt(size);
        let boardTable = document.createElement('table');
        for(let i=0; i<width; i++){
            let tr = document.createElement('tr');
            for(let j=0; j<width; j++){
                let pos = i*width+j;
                let td = document.createElement('td');
                td.className = 'cell';
                td.id = pos;
                td.innerHTML = board[pos];
                if(!game.getRevealed(pos)){
                    td.style.backgroundColor = 'red';
                }
                tr.appendChild(td);

            }
            boardTable.appendChild(tr);
        }
        this.div = boardTable;
        this.model = game;
        this.listeners = [];
        
        $('body').append(boardTable);
        $('td').on('click', this, this.revealCell);

    }
    getModel(){
        return this.model;
    }
    revealCell(e){
        let pos = this.id;
        let view = e.data;
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
                cell.style.backgroundColor = 'green';
            } else {
                cell.style.backgroundColor = 'red';

            }
        }    
    }


}