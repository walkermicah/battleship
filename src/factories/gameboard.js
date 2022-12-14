import ship from './ship';

export default function gameboard() {
  const generateBoard = () => Array(100).fill(null);

  const positions = generateBoard(); // positions

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

  return {
    positions,
    fleet,
    addShipToBoard,
    receiveAttack,
    allSunk,
  };
}
