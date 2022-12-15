import ship from './ship';

export default function gameboard() {
  const generateBoard = () => Array(100).fill(null);

  const positions = generateBoard();

  const fleet = [];

  const placeShip = (boat, coords) => {
    coords.forEach((coord) => {
      positions[coord] = boat;
    });
  };

  const addToFleet = (boat) => fleet.push(boat);

  const addShipToBoard = (type, coords) => {
    const newShip = ship(type);
    placeShip(newShip, coords);
    addToFleet(newShip);
    return newShip;
  };

  const checkTarget = (target) => positions[target];

  const markMissedAttack = (target) => {
    positions[target] = 'miss';
  };

  const receiveAttack = (target) => {
    const shipAtTarget = checkTarget(target);
    if (shipAtTarget) {
      shipAtTarget.hit();
      return 'hit';
    }
    markMissedAttack(target);
    return 'miss';
  };

  const allSunk = () => fleet.every((boat) => boat.isSunk());

  // Methods to filter invalid positions for computer ship placement
  const filterInvalidCoords = (orientation, length) => {
    const coordinates = [...Array(100).keys()];

    if (orientation === 'horizontal') {
      const filteredCoords = [];
      for (let i = 0; i < 10; i++) {
        filteredCoords.push(
          coordinates.filter(
            (coord) => coord >= i * 10 && coord < i * 10 + (11 - length)
          )
        );
      }
      return filteredCoords.flat();
    }

    if (orientation === 'vertical') {
      return coordinates.filter((coord) => coord < 100 - (length - 1) * 10);
    }
  };

  const filterOverlapCoords = (
    availableCoords,
    occupiedCoords,
    orientation,
    length
  ) => {
    const occupied = [];

    availableCoords.forEach((coord) => {
      for (let i = 0; i < length; i++) {
        const increment =
          orientation === 'horizontal' ? coord + i : coord + i * 10;
        if (occupiedCoords.includes(increment)) occupied.push(coord);
      }
    });

    return availableCoords.filter((coord) => !occupied.includes(coord));
  };

  // Methods to validate human ship placement
  const allShipsPlaced = (shipPositions) => {
    let length = 0;

    Object.keys(shipPositions).forEach((coords) => {
      length += shipPositions[coords].length;
    });

    if (length !== 17) {
      throw new Error('Please finish placing your ships!');
    }
  };

  const shipPegsAdjacent = (shipPositions) => {
    Object.keys(shipPositions).forEach((coords) => {
      const increment = shipPositions[coords][1] - shipPositions[coords][0];
      const shipLength = shipPositions[coords].length;
      let allAdjacent = true;

      if (increment === 1) {
        for (let i = shipLength - 1; i > 0; i--) {
          if (shipPositions[coords][i] - shipPositions[coords][i - 1] !== 1) {
            allAdjacent = false;
          }
        }
      } else if (increment === 10) {
        for (let i = shipLength - 1; i > 0; i--) {
          if (shipPositions[coords][i] - shipPositions[coords][i - 1] !== 10) {
            allAdjacent = false;
          }
        }
      } else {
        allAdjacent = false;
      }

      if (!allAdjacent) throw new Error('Please place your ships properly!');
    });
  };

  return {
    positions,
    fleet,
    addShipToBoard,
    receiveAttack,
    allSunk,
    filterInvalidCoords,
    filterOverlapCoords,
    allShipsPlaced,
    shipPegsAdjacent,
  };
}
