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
    beforeEach(function() {
        testBoard = [
            "rkbKqbkr",
            "pppppppp",
            "00000000",
            "000q00p0",
            "00000000",
            "00000000",
            "pppppppp",
            "rkb0Kbkr",
        ];
        board.setupTestBoard(testBoard);

    })
    it( 'should detect if position is outside the board', function() {
        let insideBoard = [4, 5];
        let outsideBoard = [-1, 5];
        const insideActual = board.isInsideBoard(insideBoard);
        const outsideActual = board.isInsideBoard(outsideBoard)
        assert.equal(insideActual, true);
        assert.equal(outsideActual, false);
    });

    it('should be able to detect an empty grid space', function() {
        let emptyPos = [2, 4];
        let occupiedPos = [1, 1];
        const emptyActual = board.isEmptyGridPos(emptyPos);
        const occupiedActual = board.isEmptyGridPos(occupiedPos);
        assert.equal(emptyActual, true);
        assert.equal(occupiedActual, false);
    })

})


