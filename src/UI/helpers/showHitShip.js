export default function showHitShip(player, target, shipType) {
  const board = document.querySelector(`.${player}-grid`);
  const holes = board.querySelectorAll('.grid-hole');
  holes[target].classList.add('hit', `${shipType}`);
}
