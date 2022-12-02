import { ship } from '../factories/ship';

let testShip;

beforeEach(() => {
  testShip = ship('battleship');
});

describe('hit()', () => {
  it('increases ship hit count by 1', () => {
    testShip.hit();
    expect(testShip.getHits()).toEqual(1);
  });
});

describe('isSunk()', () => {
  it('returns true if ship has been sunk', () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });

  it('returns false if ship has not been sunk', () => {
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
  });
});
