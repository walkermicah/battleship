import player from '../player';

let activePlayer;

beforeEach(() => {
  activePlayer = player();
});

describe('attackEnemy()', () => {
  let attacks;
  let enemyPlayer;
  let enemyGameboard;
  const target = 25;

  beforeEach(() => {
    activePlayer = player();
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
});

describe('randomPlay', () => {
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
