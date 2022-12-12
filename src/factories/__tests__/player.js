import player from '../player';

let activePlayer;

beforeEach(() => {
  activePlayer = player();
});

describe('randomPlay()', () => {
  let result;

  beforeEach(() => {
    result = activePlayer.randomPlay();
  });

  it('Returns a number', () => {
    expect(typeof result).toBe('number');
  });

  it('Returns a number between 0-99', () => {
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(99);
  });

  it('Does not return the same number twice', () => {
    const numbers = [...Array(99).keys()];
    activePlayer.attacks.push(...numbers);
    const number = activePlayer.randomPlay();
    expect(number).toBe(99);
  });
});

describe('attackEnemy()', () => {
  let attacks;
  let enemyPlayer;
  let enemyGameboard;
  const target = 25;

  beforeEach(() => {
    attacks = activePlayer.attacks;

    enemyPlayer = player();
    enemyGameboard = enemyPlayer.board;
    enemyGameboard.addShipToBoard('destroyer', [25, 26]);
  });

  it('attacks enemy ship at the target location', () => {
    activePlayer.attackEnemy(enemyPlayer, target);
    const enemyShipHits = enemyGameboard.board[target].getHits();
    expect(enemyShipHits).toBe(1);
  });

  it('adds target to list of active player attacks', () => {
    activePlayer.attackEnemy(enemyPlayer, target);
    expect(attacks).toEqual([target]);
  });

  it('does not attack the same target twice', () => {
    activePlayer.attackEnemy(enemyPlayer, target);
    activePlayer.attackEnemy(enemyPlayer, target);
    expect(attacks).toEqual([target]);
  });

  it('sinks enemy ship', () => {
    activePlayer.attackEnemy(enemyPlayer, target);
    activePlayer.attackEnemy(enemyPlayer, 26);

    expect(enemyGameboard.allSunk()).toBe(true);
  });

  it('returns `hit` if a ship is hit', () => {
    const result = activePlayer.attackEnemy(enemyPlayer, target);
    expect(result).toBe('hit');
  });

  it('returns `miss` if no ships at target', () => {
    const result = activePlayer.attackEnemy(enemyPlayer, 27);
    expect(result).toBe('miss');
  });

  it('returns undefined if target has already been hit', () => {
    activePlayer.attackEnemy(enemyPlayer, 27);
    const result = activePlayer.attackEnemy(enemyPlayer, 27);
    expect(result).toBeUndefined();
  });
});

describe('generateCompCoords()', () => {
  let result;
  let testShip;

  beforeEach(() => {
    result = activePlayer.generateCompCoords();
    testShip = result.battleship;
  });

  it('returns an object', () => {
    expect(typeof result).toBe('object');
  });

  it('returns an object with ship types as properties', () => {
    expect(result).toHaveProperty('battleship');
  });

  it('returns an object with arrays of coordinates as values', () => {
    expect(Array.isArray(testShip)).toBe(true);
  });

  it('returns arrays of coordinates that are the correct length', () => {
    expect(testShip.length).toBe(4);
  });

  it('returns coordinates that are horizontally or vertically sequential', () => {
    expect([1, 10]).toContain(testShip[1] - testShip[0]);

    // If horizontal
    if (testShip[1] - testShip[0] === 1) {
      expect(testShip[2] - testShip[1]).toBe(1);
      expect(testShip[3] - testShip[2]).toBe(1);
    }

    // If vertical
    if (testShip[1] - testShip[0] === 10) {
      expect(testShip[2] - testShip[1]).toBe(10);
      expect(testShip[3] - testShip[2]).toBe(10);
    }
  });
});

describe('filterInvalidCoords()', () => {
  const n = 2;

  it('filters out the last (n - 1) columns for a horizontal ship', () => {
    const result = activePlayer.filterInvalidCoords('horizontal', n);
    const offBoardPositions = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    const filteredPositions = result.filter((coord) =>
      offBoardPositions.includes(coord)
    );

    expect(filteredPositions.length).toBe(0);
  });

  it('filters out the last (n - 2) rows for a vertical ship', () => {
    const result = activePlayer.filterInvalidCoords('vertical', n);
    const offBoardPositions = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
    const filteredPositions = result.filter((coord) =>
      offBoardPositions.includes(coord)
    );

    expect(filteredPositions.length).toBe(0);
  });
});

describe('filterOverlapCoords', () => {
  let availableHCoords;

  beforeEach(() => {
    availableHCoords = activePlayer.filterInvalidCoords('horizontal', 2);
  });

  it('filters out occupied positions', () => {
    const occupiedCoords = [...Array(96).keys()];
    const result = activePlayer.filterOverlapCoords(
      availableHCoords,
      occupiedCoords,
      'horizontal',
      2
    );
    expect(result).toEqual([96, 97, 98]);
  });

  it('filters out horizontal positions that would overlap with other ships', () => {
    const occupiedCoords = [...Array(96).keys(), 97];
    const result = activePlayer.filterOverlapCoords(
      availableHCoords,
      occupiedCoords,
      'horizontal',
      2
    );
    expect(result).toEqual([98]);
  });

  it('filters out vertical positions that would overlap with other ships', () => {
    const availableVCoords = activePlayer.filterInvalidCoords('vertical', 2);
    const occupiedCoords = [
      ...Array(88).keys(),
      90,
      91,
      92,
      93,
      94,
      95,
      96,
      97,
      98,
    ];
    const result = activePlayer.filterOverlapCoords(
      availableVCoords,
      occupiedCoords,
      'vertical',
      2
    );
    expect(result).toEqual([89]);
  });
});

describe('positionShips()', () => {
  it('places ship on gameboard at correct location', () => {
    const coords = {
      battleship: [72],
    };
    activePlayer.positionShips(coords);
    expect(activePlayer.board.board[72]).toHaveProperty('type', 'battleship');
  });
});
