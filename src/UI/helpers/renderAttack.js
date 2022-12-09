const renderHitShip = (player, target, shipType) => {
  const board = document.querySelector(`.${player}-grid`);
  const holes = board.querySelectorAll('.grid-hole');
  holes[target].classList.add('hit', `${shipType}`);
};

const renderMissedTarget = (player, target) => {
  const board = document.querySelector(`.${player}-grid`);
  const holes = board.querySelectorAll('.grid-hole');
  holes[target].classList.add('miss');
};

export default function renderAttack(player, target, shipType, result) {
  result === 'hit'
    ? renderHitShip(player, target, shipType)
    : renderMissedTarget(player, target);
}
