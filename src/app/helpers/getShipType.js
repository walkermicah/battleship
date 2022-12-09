import { state } from '../state';

export default function getShipType(result, target) {
  return result === 'hit' && state.enemyPlayer.board.board[target].type;
}
