const board = require('./board');
const renderGame = require('./renderGame')
const factoryPiece = require('./factoryPiece');

document.addEventListener("DOMContentLoaded", () => {
    let selectedPiece;
    let selectedMovePos;
    let opponentNumber = 2;
    let player1 = {
        number: 1,
        inCheck: false
    };
    let player2 = {
        number: 2,
        inCheck: false
    };


    board.setupBoard();
    renderGame.renderCheckedBoard();
    renderGame.renderPieces(board.pieces);

    document.getElementById('piece-container').addEventListener('click', event => {
        const clickPositionString = event.target.id.split('-')
        const clickPosition = clickPositionString.map(index => +index)
        const y = clickPosition[0]
        const x = clickPosition[1]
        const currentSelectedPosition = board.pieces[y][x]
        console.log(currentSelectedPosition)

        if (currentSelectedPosition.type !== 'blank' && currentSelectedPosition.player !== opponentNumber) {
            selectedPiece = currentSelectedPosition;

            board.calcMoves(selectedPiece, opponentNumber)
            renderGame.renderPath(selectedPiece, board.pieces);
        } else {
            if (selectedPiece) {
                if (checkForMatchingMovePos(clickPosition, selectedPiece)) {
                    board.movePiece(selectedPiece, clickPosition);
                    board.calcMoves(selectedPiece, opponentNumber) //calculating again to check for king in check
                    board.clearAllPossibleMoves();
                    // filteredOpponentPieces().forEach(piece => {

                    //     board.checkedPlayer = '';
                    //     board.calcMoves(piece, oppositePlayer())
                    // });
                    renderGame.renderPath(selectedPiece, board.pieces); // renders to clear previous piece path
                    renderGame.renderPieces(board.pieces);
                    swapOpponent();
                }
            }
            selectedPiece = '';
        };
    });

    // function oppositePlayer(){
    //     return opponentNumber === 1 ? 2 : 1
    // }

    // function filteredOpponentPieces() {
    //     let filteredPieces = []
    //     for (let i = 0; i < 8; i++) {
    //         for (let j = 0; j < 8; j++) {
    //             if(board.pieces[i][j].player === opponentNumber){
    //                 filteredPieces.push(board.pieces[i][j])
    //             }
    //         }
    //     }
    //     return filteredPieces

    // }

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

    function swapOpponent() {
        if (opponentNumber === 2) {
            opponentNumber = 1
        } else {
            opponentNumber = 2
        }
    }

});