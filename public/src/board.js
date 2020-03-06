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

    check: {
        kingPosition: [],
        player: '',
        checkedPath: [],
        attackingPiecePosition: [],
    },

    lastMove: {
        type: null,
        moveFrom: null,
        moveTo: null,
        capture: ''
    },

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
                        type: 'blank',
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
                    piece.getAllMoves(pieceMoves);

                    // ADD PROPERTIES PROPERTIES FOR KING CHECK 
                    // AND STOPPING KING FROM SUICIDE 
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
        const allPaths = piece.movePaths.paths;
        const capturePaths = piece.movePaths.capturePaths;

        // ARRAY TO GATHER NEW MOVES
        const possibleMoves = [];
        const blockingAndAttackingMoves = [];

        allPaths.forEach(path => {

            let pathObstruction = false;

            // ITERATE THROUGH ALL MOVES IN PIECE
            path.forEach(move => {
                if (!pathObstruction) {

                    const newPossibleMove = [];

                    for (let i = 0; i < 2; i++) {
                        // ADD NEW POSITION TO NEWMOVE
                        newPossibleMove.push(piece.currentPos[i] - move[i]);
                    }


                    if (this.isInsideBoard(newPossibleMove)) {

                        if (this.isEmptyGridPos(newPossibleMove)) {

                            // ADD MOVE IF CAN STOP CHECK
                            if (this.canStopAttack(piece, newPossibleMove, this.check.checkedPath)) {
                                blockingAndAttackingMoves.push(newPossibleMove);
                            }

                            possibleMoves.push(newPossibleMove); // ADD NEW  MOVE TO POSSIBLEMOVES

                        } else if (this.isCapturePiece(newPossibleMove, opponentNumber) && piece.type !== 'p') {
                            if (this.canStopAttack(piece, newPossibleMove, this.check.attackingPiecePosition)) {
                                blockingAndAttackingMoves.push(newPossibleMove);
                            }

                            possibleMoves.push(newPossibleMove); // ADD NEW  MOVE TO POSSIBLEMOVES

                            if(this.isKing(newPossibleMove)) {
                                this.check.kingPosition = newPossibleMove;
                                this.setKingCheck(newPossibleMove)
                                this.check.player = opponentNumber;
                                this.check.attackingPiecePosition = [piece.currentPos]
                                this.check.checkedPath = path.map(move => {
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
        // ONLY USED FOR CALCULATING PAWN CAPTURE MOVES 
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
        // IF ANYMOVES IN BLOACKING AND ATTACKING MOVES ONLY USE THEM
        console.log('blocking:', blockingAndAttackingMoves.length);
        if (blockingAndAttackingMoves.length > 0) {
            piece.possibleMoves = blockingAndAttackingMoves;
        } else {
            piece.possibleMoves = possibleMoves;
        }
    },

    canStopAttack(piece, position, array) {
        let result = false;
        if (this.check.player) {
            array.forEach(move => {
                if (move[0] === position[0] &&
                    move[1] === position[1]) {
                    piece.canStopAttack = true;
                    result = true;
                } else {
                }
            })
        }
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

        this.createMoveNotation(piece.currentPos, position, piece.type);

        piece.currentPos = [y, x];
        this.pieces[y][x] = piece;
        this.pieces[oldPosition[0]][oldPosition[1]] = {
            type: 'blank'
        };
    },

    createMoveNotation(oldPosition, newPosition, type) {
        const gridChars = 'abcdefgh';

        const lastMove = {
            type: type,
            moveFrom: `${oldPosition[0] + 1}${gridChars[oldPosition[1]]}`,
            moveTo: `${newPosition[0] + 1}${gridChars[newPosition[1]]}`,
            capture: '' 
        }

            if (this.pieces[newPosition[0]][newPosition[1]].type === 'blank') {
                lastMove.capture = '';
            } else {
                lastMove.capture = 'x';
            }

        this.lastMove = lastMove;
    },

    clearAllPossibleMoves() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const currentPiece = this.pieces[i][j];
                currentPiece.possibleMoves = [];
                if (currentPiece.type !== 'K')
                currentPiece.canStopAttack = false;
            }
        }
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

// module.exports = board;
