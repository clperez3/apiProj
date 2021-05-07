export default class GameController{
    constructor(boardGame, boardView){
        this.boardGame = boardGame;
        this.boardView = boardView;
        boardView.addListener(this);

    }

    updateView(){
        let view = this.boardView;
        let game = this.boardGame;
        setTimeout(function(){
            view.update(game);
        }, 1000);
    }
    update(pos){
        this.boardGame.setRevealed(pos);
        this.updateView();
    }
}