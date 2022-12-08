import { state } from './state';
import player from '../factories/player';
import startView from '../UI/views/startView';
import { addHandlerStart } from '../UI/addHandlers';
import { startHandler } from './handlers';

export default function init() {
  state.humanPlayer = player();
  state.computerPlayer = player();
  state.activePlayer = state.humanPlayer;

  startView();
  addHandlerStart(startHandler);
}
