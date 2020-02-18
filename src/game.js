const Game = {
    activePlayer: 1,
    opponent: 2,
    check: {
        player: null,
        paths: {
            attacking: [],
            escape: []
         }
    },
    checkmate: false,
    draw: false,

    swapActiveAndOpponent() {
        if (this.opponent === 2) {
            this.opponent = 1;
            this.activePlayer= 2;
        } else {
            this.opponent = 2;
            this.activePlayer= 1;
        }
    }

}

module.exports = Game;
