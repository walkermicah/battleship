export default function renderSunkShip(player, shipName) {
  const legend = document.querySelector(`.${player}-legend`);
  const labels = legend.querySelectorAll('p');

  const sunkShip = Array.from(labels).find((label) =>
    label.classList.contains(`${shipName}`)
  );
  sunkShip.classList.add('sunk');
}
