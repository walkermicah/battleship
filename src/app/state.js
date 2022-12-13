const state = {
  humanPlayer: null,
  computerPlayer: null,
  activePlayer: null,
  enemyPlayer: null,

  switchActivePlayer() {
    [this.activePlayer, this.enemyPlayer] = [
      this.enemyPlayer,
      this.activePlayer,
    ];
  },
};

export { state };
