const pieces = {
    pawn: {
        currentPos: [],
        moves: [
            [2, 0], // only for first move - get rid after 
            [1, 0]
        ],
        possibleMoves: [],
    },
    bishop: {
        moves: [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ],
        possibleMoves: [],
        canMoveForever: true
    },
    knight: {
        moves: [
            [-2, -1],
            [-2, 1],
            [2, -1],
            [2, 1],
            [-1, -2],
            [-1, 2],
            [1, -2],
            [1, 2]
        ],
        possibleMoves: [],
    },
    rook: {
        moves: [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ],
        possibleMoves: [],
    },
    queen: {
        moves : [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ],
        possibleMoves: [],
    },
    king: {
        moves: [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ],
        possibleMoves: [],
    }
}

module.exports = pieces;
