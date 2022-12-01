import { gameboard } from '../factories/gameboard.js';

const testCoords = ['A1', 'A2', 'A3'];
let testGameboard;
let testShip;

beforeEach(() => {
  testGameboard = gameboard();
  testShip = testGameboard.placeShip(testCoords);
});

describe('placeShip()', () => {
  it('places ship at the coordinates provided', () => {
    const testShipCoords = testShip.getCoords();
    expect(testShipCoords).toEqual(testCoords);
  });

  it('adds ship to fleet', () => {
    const fleet = testGameboard.getFleet();
    expect(fleet[0]).toEqual(testShip);
  });

  it('throws an error if there is already a ship at that location', () => {
    const testFn = () => testGameboard.placeShip(['A1', 'A2']);
    expect(testFn).toThrow(/Already a ship at that location/);
  });

  it('does not throw an error if there is no ship at that location', () => {
    const testFn2 = () => testGameboard.placeShip(['A8', 'A9']);
    expect(testFn2).not.toThrow();
  });
});

describe('receiveAttack()', () => {
  it('hits ship if placed at target', () => {
    const testTarget = 'A1';
    testGameboard.receiveAttack(testTarget);
    const damage = testShip.getDamage();
    const expectedDamage = [testTarget];
    expect(damage).toEqual(expectedDamage);
  });

  it('does not hit ship if no ship at target', () => {
    const testTarget = 'B1';
    testGameboard.receiveAttack(testTarget);
    const damage = testShip.getDamage();
    const expectedDamage = [];
    expect(damage).toEqual(expectedDamage);
  });

  it('records missed shot if no ship at target', () => {
    const testTarget = 'B1';
    testGameboard.receiveAttack(testTarget);
    const missedShots = testGameboard.getMissedShots();
    const expectedMissedShots = [testTarget];
    expect(missedShots).toEqual(expectedMissedShots);
  });

  it('does not record a missed shot if a ship was hit', () => {
    const testTarget = 'A1';
    testGameboard.receiveAttack(testTarget);
    const missedShots = testGameboard.getMissedShots();
    const expectedMissedShots = [];
    expect(missedShots).toEqual(expectedMissedShots);
  });
});

describe('allShipsSunk', () => {
  let testShip2;

  beforeEach(() => {
    testShip2 = testGameboard.placeShip(['B1', 'B2']);
  });

  it('returns true if all ships in fleet are sunk', () => {
    testGameboard.receiveAttack('A1');
    testGameboard.receiveAttack('A2');
    testGameboard.receiveAttack('A3');
    testGameboard.receiveAttack('B1');
    testGameboard.receiveAttack('B2');

    expect(testGameboard.allShipsSunk()).toBe(true);
  });

  it('returns false if not all ships are sunk', () => {
    testGameboard.receiveAttack('B1');
    testGameboard.receiveAttack('B2');

    expect(testGameboard.allShipsSunk()).toBe(false);
  });
});
