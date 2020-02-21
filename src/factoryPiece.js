function factoryPiece(player, colour, type, currentPos) {
    return {
        player,
        colour,
        type,
        currentPos,
        possibleMoves: [],
        _movePaths: {},
        get movePaths() {
            if (this.type === 'p') {
                if (this.currentPos[0] === 6 || this.currentPos[0] === 1) {
                    return this._movePaths;
                } else {
                    return {
                        paths: this._movePaths.paths[0].slice(0, 1),
                        capturePaths: this._movePaths.capturePaths
                    }
                }
            } else {
                return this._movePaths;
            }
        },

        getAllMoves(pieceMoves) {
            console.log(pieceMoves);
            console.log(this.type, this.colour);
            if (this.type === 'p') {
                this._movePaths = pieceMoves[this.type][this.colour];
            }
            else {
                this.movePaths = pieceMoves[this.type];
            }
        }
    }
}

// module.exports = factoryPiece;
