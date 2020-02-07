const board = require('./board');
const renderGame = require('./renderGame')
const factoryPiece = require('./factoryPiece');

document.addEventListener("DOMContentLoaded", () => {
board.setupBoard();
// console.log(board.pieces);
renderGame.renderCheckedBoard();
renderGame.renderPieces(board.pieces);

    // const bishop = factoryPiece(1, 'white', 'b', [6, 4]);
    // board.calcMoves(bishop);

    // const queen = factoryPiece(1, 'white', 'q', [4, 4]);
    // board.calcMoves(queen);

        const pawn = factoryPiece(1, 'white', 'p', [6, 4]);
        board.calcMoves(pawn);

    renderGame.renderPath(pawn);

});
