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
}

module.exports = board;
