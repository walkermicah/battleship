import { state } from './state';
import player from '../factories/player';
import startView from '../UI/views/startView';

export default function init() {
  state.humanPlayer = player();
  state.computerPlayer = player();
  state.activePlayer = state.humanPlayer;
  state.enemyPlayer = state.computerPlayer;

  startView();
}
