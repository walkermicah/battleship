import gameboard from './gameboard';

export default function player() {
  const board = gameboard();
  const attacks = [];

  const randomPlay = () => {
    const moves = [...Array(100).keys()];
    const filteredMoves = moves.filter((move) => !attacks.includes(move));
    return filteredMoves[Math.floor(Math.random() * filteredMoves.length)];
  };

  const attackEnemy = (enemy, target = randomPlay()) => {
    if (attacks.includes(target)) return;
    enemy.board.receiveAttack(target);
    attacks.push(target);
  };

  return {
    board,
    attacks,
    attackEnemy,
  };
}
