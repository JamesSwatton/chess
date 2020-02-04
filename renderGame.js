const RenderGame = {

    boardTemplate: [
           "01010101",
           "10101010",
           "01010101",
           "10101010",
           "01010101",
           "10101010",
           "01010101",
           "10101010"
       ],

    pieceSymbols: {
        white: {
            p: "&#9817",
            k: "&#9816",
            b: "&#9815",
            r: "&#9814",
            q: "&#9813",
            K: "&#9812"
        },
        black: {
            p: "&#9823",
            k: "&#9822",
            b: "&#9821",
            r: "&#9820",
            q: "&#9819",
            K: "&#9818"
        }
    },

    renderCheckedBoard() {
       boardContainer = document.getElementById('board-container');
       for (let y = 0; y < 8; y++) {
           for (let x = 0; x < 8; x++) {
               if (this.boardTemplate[y][x] === "0") {
                   const whiteSquare = document.createElement('div');
                   whiteSquare.className = 'grid-square';
                   whiteSquare.style.backgroundColor = '#f0d9b5';
                   boardContainer.appendChild(whiteSquare);
               } else {
                   const blackSquare = document.createElement('div');
                   blackSquare.className = 'grid-square';
                   blackSquare.style.backgroundColor = '#B58863';
                   boardContainer.appendChild(blackSquare);
               }
           }
       }

    },

    renderPieces(pieces) {
        pieceContainer = document.getElementById('piece-container');
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let currentPiece = pieces[y][x];
                const piece = document.createElement('div');
                piece.id = `${y}-${x}`;
                if (currentPiece.type === 'blank') {
                    piece.className = `${currentPiece.type}`;
                } else {
                    piece.className = `piece ${currentPiece.type} ${currentPiece.colour}`;
                    piece.innerHTML = this.pieceSymbols[currentPiece.colour][currentPiece.type];
                }
                pieceContainer.appendChild(piece);
            }
        }

    }

}

// module.exports = renderGame;
