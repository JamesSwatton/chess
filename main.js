const board = Object.create(Board);
const renderGame = Object.create(RenderGame);
board.setupBoard();
// console.log(board.pieces);
renderGame.renderCheckedBoard();
renderGame.renderPieces(board.pieces);
