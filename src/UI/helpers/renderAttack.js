const renderHitShip = (player, target, shipType) => {
  const board = document.querySelectorAll(`.${player}-grid .grid-hole`);
  board[target].classList.add('hit', `${shipType}`);
};

const renderMissedTarget = (player, target) => {
  const board = document.querySelectorAll(`.${player}-grid .grid-hole`);
  board[target].classList.add('miss');
};

export default function renderAttack(player, target, shipType, result) {
  if (result === 'hit') {
    renderHitShip(player, target, shipType);
  } else {
    renderMissedTarget(player, target);
  }
}
