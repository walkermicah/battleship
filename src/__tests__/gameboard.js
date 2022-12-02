import { gameboard } from '../factories/gameboard.js';

let testGameboard;
let testShip;
let board;
const testCoords = [50, 51, 52, 53];

beforeEach(() => {
  testGameboard = gameboard();
  board = testGameboard.board;
  testShip = testGameboard.addShipToBoard('battleship', testCoords);
});

describe('addShipToBoard()', () => {
  it('creates a ship of the type provided', () => {
    expect(testShip).toHaveProperty('type', 'battleship');
  });

  it('places ship at the coordinates provided', () => {
    testCoords.forEach((coord) => {
      expect(board[coord]).toBeTruthy();
    });
  });

  it('adds ship to fleet', () => {
    const fleet = testGameboard.fleet;
    expect(...fleet).toHaveProperty('type', 'battleship');
  });
});

describe('receiveAttack()', () => {
  it('hits ship if positioned at target location', () => {
    const target = 50;
    testGameboard.receiveAttack(target);
    expect(testShip.getHits()).toBe(1);
    expect(board[target]).not.toBe('miss');
  });

  it('marks a missed shot if no ships at target', () => {
    const target = 60;
    testGameboard.receiveAttack(target);
    expect(board[target]).toBe('miss');
    expect(testShip.getHits()).toBe(0);
  });
});

describe('allShipsSunk', () => {
  let testShip2;

  beforeEach(() => {
    testShip2 = testGameboard.addShipToBoard('destroyer', [30, 31]);
  });

  it('returns true if all ships in fleet are sunk', () => {
    testGameboard.receiveAttack(50);
    testGameboard.receiveAttack(51);
    testGameboard.receiveAttack(52);
    testGameboard.receiveAttack(53);
    testGameboard.receiveAttack(30);
    testGameboard.receiveAttack(31);

    expect(testGameboard.allSunk()).toBe(true);
  });

  it('returns false if not all ships are sunk', () => {
    testGameboard.receiveAttack(30);
    testGameboard.receiveAttack(31);

    expect(testGameboard.allSunk()).toBe(false);
  });
});
