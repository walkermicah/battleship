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

const addShips = (newFleet) => {
  Object.keys(ships).forEach((type) => {
    const ship = newFleet.appendChild(document.createElement('div'));
    ship.classList.add('ship', `${type}`);

    for (let i = 0; i < ships[type]; i++) {
      ship.appendChild(document.createElement('span'));
    }
  });
};

export default function fleet() {
  const newFleet = createFleet();
  addShips(newFleet);
  return newFleet;
}
