
const board = require('./board');
const renderGame = require('./renderGame')
document.addEventListener("DOMContentLoaded", () => {
board.setupBoard();
// console.log(board.pieces);
renderGame.renderCheckedBoard();
renderGame.renderPieces(board.pieces);


});
