export default function renderShips(coords) {
  const board = document.querySelector('.active-grid');
  const holes = board.querySelectorAll('.grid-hole');

  Object.keys(coords).forEach((ship) => {
    coords[ship].forEach((coord) => {
      holes[coord].classList.add(`${ship}`);
    });
  });
}
