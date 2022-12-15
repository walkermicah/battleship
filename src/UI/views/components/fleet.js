// Creates a fleet of "ships" for player to place on the board
const ships = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

const createFleet = () => {
  const newFleet = document.createElement('div');
  newFleet.classList.add('fleet');
  return newFleet;
};

const newShip = (type) => {
  const ship = document.createElement('div');
  ship.classList.add('ship', `${type}`);
  return ship;
};

const draggableSpan = (type, i, n) => {
  const span = document.createElement('span');
  span.id = `${n}${i}`;
  span.draggable = true;
  span.classList.add(`${type}`, 'draggable');
  span.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.id);
  });
  return span;
};

const addShips = (newFleet) => {
  let n = 0;
  Object.keys(ships).forEach((type) => {
    const ship = newFleet.appendChild(newShip(type));

    for (let i = 0; i < ships[type]; i++) {
      ship.appendChild(draggableSpan(type, i, n));
    }
    n++;
  });
};

export default function fleet() {
  const newFleet = createFleet();
  addShips(newFleet);
  return newFleet;
}
