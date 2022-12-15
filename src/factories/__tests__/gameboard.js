import gameboard from '../gameboard';

let testGameboard;
let testShip;
let board;
const testCoords = [50, 51, 52, 53];

beforeEach(() => {
  testGameboard = gameboard();
  board = testGameboard.positions;
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
    const { fleet } = testGameboard;
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

  it('returns `hit` if a ship is hit', () => {
    const target = 50;
    const result = testGameboard.receiveAttack(target);
    expect(result).toBe('hit');
  });

  it('returns `miss` if no ships at target', () => {
    const target = 60;
    const result = testGameboard.receiveAttack(target);
    expect(result).toBe('miss');
  });
});

describe('allShipsSunk', () => {
  beforeEach(() => {
    testGameboard.addShipToBoard('destroyer', [30, 31]);
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

describe('filterInvalidCoords()', () => {
  const n = 2;

  it('filters out the last (n - 1) columns for a horizontal ship', () => {
    const result = testGameboard.filterInvalidCoords('horizontal', n);
    const offBoardPositions = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    const filteredPositions = result.filter((coord) =>
      offBoardPositions.includes(coord)
    );

    expect(filteredPositions.length).toBe(0);
  });

  it('filters out the last (n - 1) rows for a vertical ship', () => {
    const result = testGameboard.filterInvalidCoords('vertical', n);
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
    availableHCoords = testGameboard.filterInvalidCoords('horizontal', 2);
  });

  it('filters out occupied positions', () => {
    const occupiedCoords = [...Array(96).keys()];
    const result = testGameboard.filterOverlapCoords(
      availableHCoords,
      occupiedCoords,
      'horizontal',
      2
    );
    expect(result).toEqual([96, 97, 98]);
  });

  it('filters out horizontal positions that would overlap with other ships', () => {
    const occupiedCoords = [...Array(96).keys(), 97];
    const result = testGameboard.filterOverlapCoords(
      availableHCoords,
      occupiedCoords,
      'horizontal',
      2
    );
    expect(result).toEqual([98]);
  });

  it('filters out vertical positions that would overlap with other ships', () => {
    const availableVCoords = testGameboard.filterInvalidCoords('vertical', 2);
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
    const result = testGameboard.filterOverlapCoords(
      availableVCoords,
      occupiedCoords,
      'vertical',
      2
    );
    expect(result).toEqual([89]);
  });
});

describe('allShipsPlaced()', () => {
  const placements = {
    carrier: [35, 36, 37, 38, 39],
    battleship: [11, 21, 31, 41],
    cruiser: [63, 73, 83],
    submarine: [0, 10, 20],
    destroyer: [71, 72],
  };

  it('does not throw an error when all ships are placed', () => {
    const result = () => testGameboard.allShipsPlaced(placements);
    expect(result).not.toThrow();
  });

  it('throws an error when not all ship pegs are placed', () => {
    placements.destroyer.pop();
    const result = () => testGameboard.allShipsPlaced(placements);
    expect(result).toThrow();
  });
});

describe('shipPegsAdjacent()', () => {
  it('throws an error if ship pegs are not placed in horizontally/vertically adjacent positions', () => {
    const placements = {
      carrier: [32, 35, 46, 47, 89],
    };
    const result = () => testGameboard.shipPegsAdjacent(placements);
    expect(result).toThrow();
  });

  it('does not throw an error when ships pegs are placed in horizontally adjacent positions', () => {
    const placements = {
      carrier: [32, 33, 34, 35, 36],
    };
    const result = () => testGameboard.shipPegsAdjacent(placements);
    expect(result).not.toThrow();
  });

  it('does not throw an error when ships pegs are placed in vertically adjacent positions', () => {
    const placements = {
      carrier: [32, 42, 52, 62, 72],
    };
    const result = () => testGameboard.shipPegsAdjacent(placements);
    expect(result).not.toThrow();
  });
});
