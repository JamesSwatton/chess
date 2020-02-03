const board = {
    testBoard: [
        "00000000",
        "00000000",
        "00000000",
        "00000000",
        "00000000",
        "00000000",
        "00000000",
        "00000000",
    ],

    calcMoves(piece) {
        // array to gather new moves
        let possibleMoves = [];
        // iterate through all moves in piece
        piece.moves.forEach(move => {
            const newMove = [];
            for (let i = 0; i < 2; i++) {
                // add new position to newMove
                newMove.push(piece.currentPos[i] - move[i]);
            }
            // add newMove to possibleMoves
            possibleMoves.push(newMove);
        });
        return possibleMoves;
    },

    calcForeverMoves(piece) {
        let possibleMoves = [];
        if (canMoveForever) {
            piece.moves.forEach(move => {
                for (let i = 0; i < 2; i++) { 
                    const newMoveUp = [];
                    const newMoveDown = [];
                    piece.currentPos[i] - move[i]
                    for (let j = 0; j < 8; j++) {
                        newMoveDown.push(piece.currentPos[i] - move[i - j]);
                        newMoveUp.push(piece.currentPos[i] - move[j - i]);
                    }
                    possibleMoves.push(newMoveUp);
                    possibleMoves.push(newMoveDown);
                }
            })
        }
        return possibleMoves;
    },
}

module.exports = board;
