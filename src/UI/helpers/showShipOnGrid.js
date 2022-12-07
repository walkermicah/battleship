export default function showShipOnGrid(coord, shipType) {
  const board = document.querySelector('.active-grid');
  const holes = board.querySelectorAll('.grid-hole');
  holes[coord].classList.add(`${shipType}`);
}
