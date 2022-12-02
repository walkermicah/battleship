import { gameboard } from './gameboard';

const player = () => {
  const board = gameboard();
  const attacks = [];

  const randomPlay = () => {
    return Math.floor(Math.random() * 100);
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
};

export { player };
