const createGrid = (className) => {
  const newGrid = document.createElement('div');
  newGrid.classList.add('grid', `${className}`);
  return newGrid;
};

const gridHole = (coord) => {
  const hole = document.createElement('div');
  hole.setAttribute('data-coord', coord);
  hole.classList.add('grid-hole');
  return hole;
};

const droppableTarget = () => {
  const span = document.createElement('span');

  span.addEventListener('dragover', (e) => {
    if (e.target.classList.length === 0) e.preventDefault();
  });

  span.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    e.target.appendChild(document.getElementById(data));
  });

  return span;
};

const addHoles = (newGrid) => {
  for (let i = 0; i < 100; i++) {
    const hole = newGrid.appendChild(gridHole(i));
    hole.appendChild(droppableTarget());
  }
};

export default function grid(className) {
  const newGrid = createGrid(className);
  addHoles(newGrid);
  return newGrid;
}
