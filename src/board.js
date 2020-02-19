// const pieceMoves = require('./pieceMoves');
// const factoryPiece = require('./factoryPiece')


const board = {
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
    kingPosition: [],
    checkedPlayer: '',
    checkedPath: [],
    attackingPiecePosition: [],

    getCheckData() {
        if (this.cheeckedPlayer) {
            return {
                checkedPlayer: this.checkedPlayer,
                checkedPath: this.checkedPath,
                attackingPiecePosition: this.attackingPiecePosition
            }
        } else {
            return null;
        }
    },

    setupBoard() {
        for (let y = 0; y < 8; y++) {
            this.pieces[y] = [];
            for (let x = 0; x < 8; x++) {
                if (this.boardTemplate[y][x] === '0') {
                    const blank = {
                        type: 'blank'
                    };
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
                    if(type === 'K'){
                        piece.check = false
                    } else {
                        piece.canStopAttack = false;
                    }
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
                    const blank = {
                        type: 'blank'
                    };
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

    calcAllMoves(activePlayer, opponent) {
        this.pieces.forEach(row => {
            row.forEach(piece => {
                if (piece.player === activePlayer) {
                    this.calcPieceMoves(piece, opponent);
                }
            })
        })
    },

    calcPieceMoves(piece, opponentNumber) {
        piece.possibleMoves = [];
        const blockingAndAttackingMoves= [];
        const allPaths = this.getMoves(piece).paths;
        const capturePaths = this.getMoves(piece).capturePaths;
        const isPawn = piece.type === 'p';

        // array to gather new moves
        let possibleMoves = [];

        allPaths.forEach(path => {
            // iterate through all moves in piece
            let pathObstruction = false;

            path.forEach(move => {
                if (!pathObstruction) {
                    const newPossibleMove = [];
                    for (let i = 0; i < 2; i++) {
                        // add new position to newMove
                        newPossibleMove.push(piece.currentPos[i] - move[i]);
                    }
                    if (this.isInsideBoard(newPossibleMove)) {

                        if (this.isEmptyGridPos(newPossibleMove)) {
                            if (this.canStopAttack(piece, newPossibleMove, this.checkedPath)) {
                                blockingAndAttackingMoves.push(newPossibleMove);
                            }
                            // add newMove to possibleMoves
                            possibleMoves.push(newPossibleMove);
                            // console.log(this.att);
                        } else if (this.isCapturePiece(newPossibleMove, opponentNumber) && !isPawn) {
                            if (this.canStopAttack(piece, newPossibleMove, this.attackingPiecePosition)) {
                                blockingAndAttackingMoves.push(newPossibleMove);
                            }
                            possibleMoves.push(newPossibleMove);
                            if(this.isKing(newPossibleMove)){
                                this.kingPosition = newPossibleMove;
                                this.setKingCheck(newPossibleMove)
                                //TODO think about making this it's own function
                                //taking the path that put king in check and
                                //filtering moves to king.
                                this.checkedPlayer = opponentNumber;
                                this.attackingPiecePosition = [piece.currentPos]
                                this.checkedPath = path.map(move => {
                                    let pathMove = [];
                                    for (let i = 0; i < 2; i++) {
                                        pathMove.push(piece.currentPos[i] - move[i]);
                                    }
                                        return pathMove;
                                }).filter(move => move.every(el => el >= 0));
                            }
                            pathObstruction = true;
                        } else {
                            pathObstruction = true;
                        }
                    } else {
                        pathObstruction = true;
                    }
                }
            });
        })

        if (capturePaths) {
            capturePaths.forEach(path => {

                path.forEach(move => {
                    const newPossibleMove = [];
                    for (let i = 0; i < 2; i++) {
                        newPossibleMove.push(piece.currentPos[i] - move[i]);
                    }
                    if (this.isInsideBoard(newPossibleMove)){
                        if (this.isCapturePiece(newPossibleMove, opponentNumber)) {
                            possibleMoves.push(newPossibleMove);
                            if(this.isKing(newPossibleMove)){
                                this.setKingCheck(newPossibleMove)
                            }
                        }
                    }

                })
            })
        }
        if (blockingAndAttackingMoves.length > 0) {
            piece.possibleMoves =blockingAndAttackingMoves;
        } else {
            piece.possibleMoves = possibleMoves;
        }
    },

    canStopAttack(piece, position, array) {
        let result = false;
        array.forEach(move => {
            if (move[0] === position[0] &&
                move[1] === position[1]) {
                piece.canStopAttack = true;
                result = true;
            } else {
            }
        })
        return result;
    },

    isKing(move) {
        const y = move[0];
        const x = move[1];
        return (this.pieces[y][x].type === 'K');
    },

    setKingCheck(move){ // this is to for rendering purposes
        console.log('inside set check:', move);
        const y = move[0];
        const x = move[1];
        if (this.pieces[y][x].check) {
            console.log('should be false');
            this.pieces[y][x].check = false;
        } else { 
            this.pieces[y][x].check = true;     
        }
    },

    movePiece(piece, position) {
        const y = position[0];
        const x = position[1];
        const oldPosition = piece.currentPos;
        piece.currentPos = [y, x];

        this.pieces[y][x] = piece;
        this.pieces[oldPosition[0]][oldPosition[1]] = {
            type: 'blank'
        };
    },

    clearAllPossibleMoves() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.pieces[i][j].possibleMoves = [];
                this.pieces[i][j].canStopAttack = false;
            }
        }
    },

    isPawnStart(pawn) {
        return (pawn.currentPos[0] === 6 || pawn.currentPos[0] === 1);
    },

    getMoves(piece) {
        if (piece.type === 'p') {
            if (this.isPawnStart(piece)) {
                return pieceMoves[piece.type][piece.colour];
            } else {
                return {
                    paths: [pieceMoves[piece.type][piece.colour].paths[0].slice(0, 1)],
                    capturePaths: pieceMoves[piece.type][piece.colour].capturePaths
                }
            }
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

    isCapturePiece(move, opponentNumber) {
        const y = move[0];
        const x = move[1];
        return (this.pieces[y][x].player === opponentNumber)
    },





}

// export default board;
