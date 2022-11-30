import { ship } from '../factories/ship';

const testCoords = ['A1', 'A2', 'A3'];

let testShip;
let damage;

beforeEach(() => {
  testShip = ship(testCoords);
  damage = testShip.getDamage();
});

describe('getDamage()', () => {
  it('returns damage array', () => {
    expect(damage).toEqual([]);
  });
});

describe('hit()', () => {
  it('hits ship at target', () => {
    testShip.hit('A1');
    expect(damage).toEqual(['A1']);
  });

  it('does not hit if target has already been hit', () => {
    testShip.hit('A1');
    testShip.hit('A1');
    expect(damage).toEqual(['A1']);
  });

  it('does not hit if ship is not at target', () => {
    testShip.hit('A4');
    expect(damage).toEqual([]);
  });
});

describe('isSunk()', () => {
  it('sinks ship if it has been hit at all targets', () => {
    testShip.hit('A1');
    testShip.hit('A2');
    testShip.hit('A3');
    expect(testShip.isSunk()).toBe(true);
  });

  it('does not sink ship if it has not been hit at all targets', () => {
    testShip.hit('A3');
    expect(testShip.isSunk()).toBe(false);
  });
});
