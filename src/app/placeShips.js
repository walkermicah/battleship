import { state } from './state';

// Place human ships on gameboard
const placeHumanShips = () => {
  const coords = {
    carrier: [25, 26, 27, 28, 29],
    battleship: [64, 74, 84, 94],
    cruiser: [42, 43, 44],
    submarine: [11, 21, 31],
    destroyer: [98, 99],
  };

  Object.keys(coords).forEach((ship) => {
    state.humanPlayer.board.addShipToBoard(ship, coords[ship]);
  });

  return coords;
};

// Place computer ships on gameboard
const placeComputerShips = () => {
  const coords = {
    carrier: [55, 65, 75, 85, 95],
    battleship: [62, 72, 82, 92],
    cruiser: [15, 16, 17],
    submarine: [1, 2, 3],
    destroyer: [29, 39],
  };

  Object.keys(coords).forEach((ship) => {
    state.humanPlayer.board.addShipToBoard(ship, coords[ship]);
  });

  return coords;
};

export { placeHumanShips, placeComputerShips };
