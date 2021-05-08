export default class Game{
    //game = {board, isrevealed, onMove, firstReveal,totalMatched, onWinCalls, totalMoves}
    constructor(width){
        let size = width*width;
        this.board = new Array(size);
        this.board.fill(0);

        this.isRevealed = new Array(size);
        this.isRevealed.fill(false);

        this.onMove=false;
        this.firstReveal=0;
        this.totalMatched=0;
        this.totalMoves=0;


        this.onWinCalls = [];


        let board = this.board;
        let pairs = size/2;
        for(let i=0; i<pairs; i++){
            let hasPlaced = false;
            while (!hasPlaced){
                let position = Math.floor(Math.random()*size);
                if(board[position] === 0){
                    board[position] = i;
                    hasPlaced = true;
                }
            }
            hasPlaced = false;
            while (!hasPlaced){
                let position = Math.floor(Math.random()*size);
                if(board[position] === 0){
                    board[position] = i;
                    hasPlaced = true;
                }
            }
        }
    }

    won(){
        if(this.onWinCalls !== undefined){
            this.onWinCalls.forEach(fn=>{
                fn(this);
            })
        }
    }
    getBoard(){
        return this.board;
    }
    getRevealed(position){
        return this.isRevealed[position];
    }
    setRevealed(position){
        if(!this.isRevealed[position]){
            this.isRevealed[position] = true;
            if(!this.onMove){
                this.firstReveal=position;
                this.onMove=true;
            }else{
                this.totalMoves++;
                if(this.board[this.firstReveal] === this.board[position]){
                    this.totalMatched +=2;
                    if(this.totalMatched == this.board.length){
                        this.won();
                    }
                } else {
                    this.isRevealed[position] = false;
                    this.isRevealed[this.firstReveal] = false;
                }
                this.onMove=false;
            }
        }  
        return;
    }

    getTotalMoves(){
        return this.totalMoves;
    }

    onWin(fn){
        this.onWinCalls.push(fn);
    }
}