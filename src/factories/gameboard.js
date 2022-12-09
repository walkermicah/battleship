import ship from './ship';

export default function gameboard() {
  const generateBoard = () => Array(100).fill(null);

  const board = generateBoard();

  const fleet = [];

  const placeShip = (boat, coords) => {
    coords.forEach((coord) => {
      board[coord] = boat;
    });
  };

  const addToFleet = (boat) => fleet.push(boat);

  const addShipToBoard = (type, coords) => {
    const newShip = ship(type);
    placeShip(newShip, coords);
    addToFleet(newShip);
    return newShip;
  };

  const checkTarget = (target) => board[target];

  const markMissedAttack = (target) => {
    board[target] = 'miss';
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
    board,
    fleet,
    addShipToBoard,
    receiveAttack,
    allSunk,
  };
}
