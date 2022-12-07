const createGrid = (className) => {
  const newGrid = document.createElement('div');
  newGrid.classList.add('grid', `${className}`);
  return newGrid;
};

const addHoles = (newGrid) => {
  for (let i = 0; i < 100; i++) {
    const hole = newGrid.appendChild(document.createElement('div'));
    hole.setAttribute('data-coord', i);
    hole.classList.add('grid-hole');
    hole.appendChild(document.createElement('span'));
  }
};

export default function grid(className) {
  const newGrid = createGrid(className);
  addHoles(newGrid);
  return newGrid;
}
