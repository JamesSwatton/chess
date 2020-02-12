const board = require('./board');
const renderGame = require('./renderGame')
const factoryPiece = require('./factoryPiece');

document.addEventListener("DOMContentLoaded", () => {
    let selectedPiece;
    let selectedMovePos;
    let opponentNumber = 2;

    board.setupBoard();
    renderGame.renderCheckedBoard();
    renderGame.renderPieces(board.pieces);

    document.getElementById('piece-container').addEventListener('click', event => {
        const clickPositionString = event.target.id.split('-')
        const clickPosition = clickPositionString.map(index => +index)
        const y = clickPosition[0]
        const x = clickPosition[1]
        const currentSelectedPosition = board.pieces[y][x]

        if (currentSelectedPosition.type !== 'blank' && currentSelectedPosition.player !== opponentNumber) {
            selectedPiece = currentSelectedPosition;

            board.calcMoves(selectedPiece, opponentNumber)
            renderGame.renderPath(selectedPiece);
        } else {
            if (selectedPiece) {
                if (checkForMatchingMovePos(clickPosition, selectedPiece)) {
                    board.movePiece(selectedPiece, clickPosition);
                    board.clearAllPossibleMoves();
                    renderGame.renderPath(selectedPiece);
                    renderGame.renderPieces(board.pieces);
                    swapOpponent();
                }
            }
            selectedPiece = '';
        }
        // console.log(selectedPiece);
        // console.log('click', clickPosition);
    });

    function checkForMatchingMovePos(position, piece) {
        let result = false;
        piece.possibleMoves.forEach(move => {
            if (move[0] === position[0]
                && move[1] === position[1]) {
                result = true;
            }
        })
        return result;
    }

    function swapOpponent(){
        if(opponentNumber === 2) {
             opponentNumber = 1
        } else {
            opponentNumber = 2
        }
    }
    
});
