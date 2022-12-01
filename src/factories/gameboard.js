import { ship } from './ship.js';

const gameboard = () => {
  const fleet = [];
  const missedShots = [];

  const getFleet = () => fleet;

  const getMissedShots = () => missedShots;

  const validateCoordsEmpty = (coords) => {
    const occupiedCoords = fleet.flatMap((ship) => ship.getCoords());
    const coordCheck = coords.map((coord) => occupiedCoords.includes(coord));
    if (coordCheck.includes(true)) {
      throw new Error('Already a ship at that location!');
    }
  };

  const placeShip = (coords) => {
    validateCoordsEmpty(coords);
    const newShip = ship(coords);
    fleet.push(newShip);
    return newShip;
  };

  const checkFleet = (target) =>
    fleet.find((ship) => ship.getCoords().includes(target));

  const receiveAttack = (target) => {
    const targetedShip = checkFleet(target);
    targetedShip ? targetedShip.hit(target) : missedShots.push(target);
  };

  const allShipsSunk = () => fleet.every((ship) => ship.isSunk());

  return {
    getFleet,
    getMissedShots,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};

export { gameboard };
