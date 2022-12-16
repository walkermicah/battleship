import { state } from './state';
import player from '../factories/player';

export default function init() {
  state.humanPlayer = player();
  state.computerPlayer = player();
  state.activePlayer = state.humanPlayer;
  state.enemyPlayer = state.computerPlayer;
}
