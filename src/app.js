// const board = require('./board');
// const game = require('./game');
// const renderGame = require('./renderGame')

document.addEventListener("DOMContentLoaded", () => {
    let selectedPiece;
    console.log(game);

    // setup game
    board.setupBoard();
    renderGame.renderCheckedBoard();
    renderGame.renderPieces(board.pieces);
    board.calcAllMoves(game.activePlayer, game.opponent)

    document.getElementById('piece-container').addEventListener('click', event => {
        const clickPositionString = event.target.id.split('-')
        const clickPosition = clickPositionString.map(index => +index)
        const y = clickPosition[0]
        const x = clickPosition[1]
        const currentSelectedPosition = board.pieces[y][x]
        console.log(currentSelectedPosition)
        console.log('active player: ', game.activePlayer);

        //check if player is in check and only allow movement of pieces that can
        //block / attack or excape
        if (board.checkedPlayer) {
            if (currentSelectedPosition.canStopAttack) {
                selectedPiece = currentSelectedPosition;
                renderGame.renderPath(selectedPiece, board.pieces);
            } else {
                if (selectedPiece) {
                    if (checkForMatchingMovePos(clickPosition, selectedPiece)) {
                        board.movePiece(selectedPiece, clickPosition);
                        board.calcAllMoves(game.activePlayer, game.opponent) //calculating again to check for king in check
                        board.clearAllPossibleMoves();
                        board.checkedPlayer = '';
                        console.log(board.kingPosition);
                        board.setKingCheck(board.kingPosition);
                        renderGame.renderPath(selectedPiece, board.pieces); // renders to clear previous piece path
                        renderGame.renderPieces(board.pieces);
                        game.swapActiveAndOpponent();
                        board.calcAllMoves(game.activePlayer, game.opponent)
                        renderGame.renderPath(selectedPiece, board.pieces);
                    }
                }
                selectedPiece = '';
            }
        } else if (currentSelectedPosition.type !== 'blank' && currentSelectedPosition.player === game.activePlayer) {
            selectedPiece = currentSelectedPosition;

            renderGame.renderPath(selectedPiece, board.pieces);
        } else {
            if (selectedPiece) {
                if (checkForMatchingMovePos(clickPosition, selectedPiece)) {
                    board.movePiece(selectedPiece, clickPosition);
                    board.calcAllMoves(game.activePlayer, game.opponent) //calculating again to check for king in check
                    board.clearAllPossibleMoves();
                    renderGame.renderPath(selectedPiece, board.pieces); // renders to clear previous piece path
                    renderGame.renderPieces(board.pieces);
                    game.swapActiveAndOpponent();
                    board.calcAllMoves(game.activePlayer, game.opponent)
                    renderGame.renderPath(selectedPiece, board.pieces);
                }
            }
            selectedPiece = '';
        };
    });

    function checkForMatchingMovePos(position, piece) {
        let result = false;
        piece.possibleMoves.forEach(move => {
            if (move[0] === position[0] &&
                move[1] === position[1]) {
                result = true;
            }
        })
        return result;
    }

    
});
