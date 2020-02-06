const board = require('../src/board'); 
const moves = require('../src/pieceMoves');
const factoryPiece = require('../src/factoryPiece');
const assert = require('assert');

describe('piece', function() {
    it ('should have moves when calculated', function() {
        const pawn = factoryPiece(1, 'white', 'p', [6, 4]);
        board.calcMoves(pawn);
        const actual = pawn.possibleMoves;
        assert.deepStrictEqual(actual, [[4, 4], [5, 4]]);
    })
})
describe('board', function() {
    // beforeEach(function() {
        
    // })
    it( 'should detect if position is outside the board', function() {
        let insideBoard = [4, 5];
        let outsideBoard = [-1, 5];
        const insideActual = board.isInsideBoard(insideBoard);
        const outsideActual = board.isInsideBoard(outsideBoard)
        assert.equal(insideActual, true);
        assert.equal(outsideActual, false);
    })
})


// describe('piece', function() {
//     it ('should gather new moves', function() {
//         const pawn = pieces.pawn;
//         const startPos = [7, 4];
//         pawn.currentPos = startPos;
//         const actual = board.calcMoves(pawn);
//         console.log(actual);
//         assert.deepStrictEqual(actual, [[5, 4], [6, 4]]);
//     })
// })

// describe('piece', function() {
//     it ('should gather every move position until the edge of the board', function() {
//         const bishop = pieces.bishop;
//         const startPos = [2, 2];
//         bishop.currentPos = startPos;
//         const actual = board.calcMoves(bishop);
//         console.log(actual);
//     })
// })
