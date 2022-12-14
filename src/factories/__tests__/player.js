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
    enemyGameboard.addShipToBoard('destroyer', [55, 56]);
  });

  it('returns a random number between 0-99 if no moves in the queue', () => {
    const target = activePlayer.smartPlay();
    expect(typeof target).toBe('number');
    expect(target).toBeGreaterThanOrEqual(0);
    expect(target).toBeLessThanOrEqual(99);
  });

  it('returns next position in the queue if previous attack was a hit', () => {
    activePlayer.attackEnemy(enemyPlayer, 55, true);
    const target = activePlayer.smartPlay();
    expect([54, 56, 45, 65]).toContain(target);
  });

  it('does not return a position that has already been attacked', () => {
    activePlayer.attacks.push(45);
    activePlayer.attackQueue.push([55, 45], [55, 65]);
    expect(activePlayer.smartPlay()).toBe(65);
  });
});

describe('attackEnemy()', () => {
  const target = 25;

  beforeEach(() => {
    enemyGameboard.addShipToBoard('destroyer', [25, 26]);
  });

  it('attacks enemy ship at the target location', () => {
    activePlayer.attackEnemy(enemyPlayer, target);
    const enemyShipHits = enemyGameboard.positions[target].getHits();
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

  it('updates attack queue if player is computer', () => {
    activePlayer.attackEnemy(enemyPlayer, target, true);
    expect(activePlayer.attackQueue.length).toBeGreaterThan(0);
  });

  it('does not update attack queue if player is human', () => {
    activePlayer.attackEnemy(enemyPlayer, target);
    expect(activePlayer.attackQueue.length).toBe(0);
  });

  it('returns `hit` if a ship is hit', () => {
    const result = activePlayer.attackEnemy(enemyPlayer, target);
    expect(result).toBe('hit');
  });

  it('returns `miss` if no ships at target', () => {
    const result = activePlayer.attackEnemy(enemyPlayer, 27);
    expect(result).toBe('miss');
  });

  it('returns null if target has already been hit', () => {
    activePlayer.attackEnemy(enemyPlayer, 27);
    const result = activePlayer.attackEnemy(enemyPlayer, 27);
    expect(result).toBeNull();
  });
});

describe('updateQueue()', () => {
  beforeEach(() => {
    enemyGameboard.addShipToBoard('battleship', [6, 7, 8, 9]);
    enemyGameboard.addShipToBoard('submarine', [79, 89, 99]);
    enemyGameboard.addShipToBoard('cruiser', [25, 26, 27]);
    enemyGameboard.addShipToBoard('destroyer', [60, 70]);
  });

  it('adds next moves to computer player queue after a successful attack', () => {
    activePlayer.attackEnemy(enemyPlayer, 26, true);
    const expectedQueue = [
      [26, 25],
      [26, 27],
      [26, 16],
      [26, 36],
    ];
    const firstInQueue = activePlayer.attackQueue[0];
    expect(expectedQueue).toContainEqual(firstInQueue);
  });

  it('queues next adjacent horizontal position if prev 2+ attacks in that direction were hits', () => {
    activePlayer.attackQueue.push([6, 7]);
    activePlayer.updateQueue(enemyPlayer, 'hit', 7);
    expect(activePlayer.attackQueue[0]).toEqual([6, 7, 8]);
  });

  it('queues next adjacent vertical position if prev 2+ attacks in that direction were hits', () => {
    activePlayer.attackQueue.push([99, 89]);
    activePlayer.updateQueue(enemyPlayer, 'hit', 89);
    expect(activePlayer.attackQueue[0]).toEqual([99, 89, 79]);
  });

  it('removes first element from queue if attack is a miss', () => {
    activePlayer.attackQueue.push([79, 69], [79, 89]);
    activePlayer.updateQueue(enemyPlayer, 'miss', 69);
    expect(activePlayer.attackQueue).toEqual([[79, 89]]);
  });

  it('stops adding adjacent positions to queue at the end of a row', () => {
    activePlayer.attackQueue.push([8, 9]);
    activePlayer.updateQueue(enemyPlayer, 'hit', 9);
    expect(activePlayer.attackQueue[0]).not.toEqual([8, 9, 10]);
  });

  it('stops adding adjacent positions to queue at the end of a column', () => {
    activePlayer.attackQueue.push([89, 99]);
    activePlayer.updateQueue(enemyPlayer, 'hit', 99);
    expect(activePlayer.attackQueue[0]).not.toEqual([89, 99, 109]);
  });

  it('empties queue when ship is sunk', () => {
    activePlayer.attackEnemy(enemyPlayer, 60, true);
    activePlayer.attackEnemy(enemyPlayer, 70, true);
    expect(activePlayer.attackQueue.length).toBe(0);
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

describe('positionShips()', () => {
  it('places ships on gameboard at correct location', () => {
    const coords = {
      carrier: [20, 30, 40, 50, 60],
      battleship: [72, 73, 74, 75],
      cruiser: [81, 82, 83],
      submarine: [42, 52, 62],
      destroyer: [98, 99],
    };
    activePlayer.positionShips(coords);
    expect(activePlayer.board.positions[72]).toHaveProperty(
      'type',
      'battleship'
    );
  });
});
