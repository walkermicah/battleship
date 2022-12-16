import { state } from '../state';
import endView from '../../UI/views/endView';

export default function checkForWinner() {
  const gameOver = state.enemyPlayer.board.allSunk();
  if (!gameOver) return null;
  const winner = state.activePlayer === state.humanPlayer && 'human';
  endView(winner);
  return winner;
}
