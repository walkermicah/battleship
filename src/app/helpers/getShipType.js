import { state } from '../state';

export default function getShipType(result, target) {
  return result === 'hit' && state.computerPlayer.board.board[target].type;
}
