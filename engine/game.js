export default class Game{
    constructor(width){
        let size = width*width;
        this.board = new Array(size);
        this.board.fill(0);

        this.isRevealed = new Array(size);
        this.isRevealed.fill(false);

        this.onMove=false;
        this.firstReveal=0;
        this.totalMatched=0;


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
    move(card0, card1){
        let board = this.board;
        if(board[card0] === board[card1]){
            this.isRevealed[card0] = true;
            this.isRevealed[card1] = true;
            this.totalMatched +=1;
        }

        if(this.totalRevealed == board.length){
            this.won();
        }

        
    }
    won(){
        if(this.onWinCalls !== undefined){
            this.onWinCalls.forEach(fn=>{
                fn();
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

    onWin(fn){
        this.onWinCalls.push(fn);
    }
}