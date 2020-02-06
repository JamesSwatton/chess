const pieceMoves = require('./pieceMoves');


const Board = {
    pieces: [],

    boardTemplate: [
        "rkbKqbkr",
        "pppppppp",
        "00000000",
        "00000000",
        "00000000",
        "00000000",
        "pppppppp",
        "rkbqKbkr",
    ],

    setupBoard() {
        for (let y = 0; y < 8; y++) {
            this.pieces[y] = [];
            for (let x = 0; x < 8; x++) {
                if (this.boardTemplate[y][x] === '0') {
                    const blank = {type: 'blank'};
                    this.pieces[y].push(blank);
                } else {
                    let colour;
                    let player;
                    const type = this.boardTemplate[y][x];
                    // assign colour
                    if (y === 0 || y === 1) {
                        colour = 'black';
                        player = 2;
                    } else {
                        colour = 'white';
                        player = 1;
                    }
                    const piece = factoryPiece(player, colour, type, [y, x]);
                    this.pieces[y].push(piece);
                }
            }
        }    
    },

    getMoves(piece) {
        if (piece.type === 'p') {
           return pieceMoves[piece.type][piece.colour].moves; 
        }
        return pieceMoves[piece.type];
    },

    calcMoves(piece) {
        const moves = this.getMoves(piece);
        // array to gather new moves
        let possibleMoves = [];
        // iterate through all moves in piece
        moves.forEach(move => {
            const newPossibleMove = [];
            for (let i = 0; i < 2; i++) {
                // add new position to newMove
                newPossibleMove.push(piece.currentPos[i] - move[i]);
            }
            // add newMove to possibleMoves
            possibleMoves.push(newPossibleMove);
        });
        piece.possibleMoves = possibleMoves;
    },
}

module.exports = Board;
