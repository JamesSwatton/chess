const pieceMoves = require('./pieceMoves');
const factoryPiece = require('./factoryPiece')


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

    setupTestBoard(board) {
        for (let y = 0; y < 8; y++) {
            this.pieces[y] = [];
            for (let x = 0; x < 8; x++) {
                if (board[y][x] === '0') {
                    const blank = {type: 'blank'};
                    this.pieces[y].push(blank);
                } else {
                    let colour;
                    let player;
                    const type = board[y][x];
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

    isInsideBoard(move) {
        return move.every(pos => (pos >= 0 && pos <= 7));
    },

    isEmptyGridPos(move) {
        const y = move[0];
        const x = move[1];
        return (this.pieces[y][x].type === 'blank');
    },

    calcMoves(piece) {
        const allPaths = this.getMoves(piece);
        console.log('paths', allPaths);

        // array to gather new moves
        let possibleMoves = [];

        allPaths.forEach(path => {
            console.log('path', path);
            // iterate through all moves in piece
                let pathObstruction = false;

            path.forEach(move => {
                console.log('move', move);
                if (!pathObstruction) {
                    const newPossibleMove = [];
                    for (let i = 0; i < 2; i++) {
                        // add new position to newMove
                        newPossibleMove.push(piece.currentPos[i] - move[i]);
                    }
                    if (this.isInsideBoard(newPossibleMove)) {
                        if (this.isEmptyGridPos(newPossibleMove)) {
                            // add newMove to possibleMoves
                            possibleMoves.push(newPossibleMove);
                        } else {
                            pathObstruction = true;
                        }
                    } else {
                        pathObstruction = true;
                    }
                }
                console.log(pathObstruction);
            });
        })
        console.log('possible moves', possibleMoves);
        piece.possibleMoves = possibleMoves;
    },
}

module.exports = Board;
