export default function showMissedTarget(player, target) {
  const board = document.querySelector(`.${player}-grid`);
  const holes = board.querySelectorAll('.grid-hole');
  holes[target].classList.add('miss');
}
