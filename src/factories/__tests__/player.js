import player from '../player';

describe('attackEnemy()', () => {
  let activePlayer;
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

  it('chooses a random target from 0-99 if no target provided', () => {
    activePlayer.attackEnemy(enemyPlayer);
    expect(typeof attacks[0]).toBe('number');
    expect(attacks[0]).toBeGreaterThanOrEqual(0);
    expect(attacks[0]).toBeLessThanOrEqual(99);
  });

  it('sinks enemy ship', () => {
    activePlayer.attackEnemy(enemyPlayer, 25);
    activePlayer.attackEnemy(enemyPlayer, 26);

    expect(enemyGameboard.allSunk()).toBe(true);
  });
});
