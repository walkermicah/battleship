import player from '../player';

let activePlayer;
let attacks;
let enemyPlayer;
let enemyGameboard;

beforeEach(() => {
  activePlayer = player();
  attacks = activePlayer.attacks;

  enemyPlayer = player();
  enemyGameboard = enemyPlayer.board;
});

describe('smartPlay()', () => {
  beforeEach(() => {
    enemyGameboard.addShipToBoard('carrier', [0, 1, 2, 3, 4, 5]);
    enemyGameboard.addShipToBoard('battleship', [9, 19, 29, 39]);
    enemyGameboard.addShipToBoard('destroyer', [55, 56]);
  });

  it('returns a random number between 0-99', () => {
    const target = activePlayer.smartPlay();
    expect(typeof target).toBe('number');
    expect(target).toBeGreaterThanOrEqual(0);
    expect(target).toBeLessThanOrEqual(99);
  });

  it('returns an adjacent position if previous attack was a hit', () => {
    activePlayer.attackEnemy(enemyPlayer, 1, true);
    const target = activePlayer.smartPlay();
    expect(target).toBe(0);
  });

  it('returns next adjacent horizontal position if prev 2+ attacks in that direction were hits', () => {
    activePlayer.attackEnemy(enemyPlayer, 2, true);
    const target1 = activePlayer.smartPlay(); // 1
    activePlayer.attackEnemy(enemyPlayer, target1, true); // hit
    const target2 = activePlayer.smartPlay();
    expect(target2).toBe(0);
  });

  it('returns next adjacent vertical position if prev 2+ attacks in that direction were hits', () => {
    activePlayer.attackEnemy(enemyPlayer, 29, true);
    const target1 = activePlayer.smartPlay(); // 28
    activePlayer.attackEnemy(enemyPlayer, target1, true); // miss
    const target2 = activePlayer.smartPlay(); // 19
    activePlayer.attackEnemy(enemyPlayer, target2, true); // hit
    const target3 = activePlayer.smartPlay();
    expect(target3).toBe(9);
  });

  it('stops adjacent attacks when next attack is a miss', () => {
    activePlayer.attackEnemy(enemyPlayer, 55, true);
    const target1 = activePlayer.smartPlay(); // 54
    activePlayer.attackEnemy(enemyPlayer, target1, true); // miss
    const target2 = activePlayer.smartPlay();
    expect(target2).not.toBe(53);
  });

  it('stops adjacent attacks at the end of a row', () => {
    activePlayer.attackEnemy(enemyPlayer, 0, true);
    const target = activePlayer.smartPlay();
    expect(target).not.toBe(-1);
  });

  it('stops adjacent attacks at the end of a column', () => {
    activePlayer.attackEnemy(enemyPlayer, 19, true);
    const target1 = activePlayer.smartPlay(); // 18
    activePlayer.attackEnemy(enemyPlayer, target1, true); // miss
    const target2 = activePlayer.smartPlay(); // 20
    activePlayer.attackEnemy(enemyPlayer, target2, true); // miss
    const target3 = activePlayer.smartPlay(); // 9
    activePlayer.attackEnemy(enemyPlayer, target3, true); // hit
    const target4 = activePlayer.smartPlay();
    expect(target4).not.toBe(-9);
  });

  it('does not attack the same location twice', () => {
    activePlayer.attackEnemy(enemyPlayer, 19, true);
    const target1 = activePlayer.smartPlay(); // 18
    activePlayer.attackEnemy(enemyPlayer, target1, true); // miss
    const target2 = activePlayer.smartPlay(); // 20
    activePlayer.attackEnemy(enemyPlayer, target2, true); // miss
    const target3 = activePlayer.smartPlay(); // 9
    activePlayer.attackEnemy(enemyPlayer, target3, true); // hit
    const target4 = activePlayer.smartPlay();
    expect(target4).not.toBe(9);
  });

  it('stops attacking adjacent positions when ship is sunk', () => {
    activePlayer.attackEnemy(enemyPlayer, 56, true);
    const target1 = activePlayer.smartPlay(); // 55
    activePlayer.attackEnemy(enemyPlayer, target1, true); // sunk
    const target2 = activePlayer.smartPlay();
    expect([54, 57, 46, 66]).not.toContain(target2, true);
  });

  it('backtracks in opposite direction if end of ship has been reached but ship has not been sunk', () => {
    activePlayer.attackEnemy(enemyPlayer, 1, true);
    const target4 = activePlayer.smartPlay(); // 0
    activePlayer.attackEnemy(enemyPlayer, target4, true); // hit
    const target5 = activePlayer.smartPlay();
    expect(target5).toBe(2);
  });
});

describe('attackEnemy()', () => {
  const target = 25;

  beforeEach(() => {
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

  it('filters out the last (n - 1) rows for a vertical ship', () => {
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
