export default function getShipPlacements() {
  const placements = {
    carrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: [],
  };
  const gridHoles = document.querySelectorAll('.grid-hole span');

  gridHoles.forEach((hole) => {
    if (hole.hasChildNodes()) {
      const type = hole.firstChild.classList[0];
      const { coord } = hole.parentElement.dataset;
      placements[type].push(coord);
    }
  });

  return placements;
}
