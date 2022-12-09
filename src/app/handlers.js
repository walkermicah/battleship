import clearUI from '../UI/helpers/clearUI';
import placeFleetView from '../UI/views/placeFleetView';
import gameView from '../UI/views/gameView';
import footer from '../UI/views/components/footer';
import {
  addHandlerPlaceFleet,
  addHandlerHumanPlay,
  addHandlerCompPlay,
} from '../UI/addHandlers';
import { placeComputerShips, placeHumanShips } from './placeShips';
import renderShips from '../UI/helpers/renderShips';
import { state } from './state';
import renderAttack from '../UI/helpers/renderAttack';
import getTarget from '../UI/helpers/getTarget';
import getShipType from './helpers/getShipType';
import checkIfSunk from './helpers/checkIfSunk';
import switchActivePlayer from './helpers/switchActivePlayer';
import toggleCompPlayBtn from '../UI/helpers/toggleCompPlayBtn';

// human player turn
const humanPlayHandler = (e) => {
  if (state.activePlayer === state.humanPlayer) {
    const target = getTarget(e);
    const result = state.humanPlayer.attackEnemy(state.computerPlayer, target);
    const shipType = getShipType(result, target);
    renderAttack('enemy', target, shipType, result);
    if (result === 'hit') checkIfSunk(state.computerPlayer, 'enemy', target);
    // check for winner
    switchActivePlayer();
    toggleCompPlayBtn();
  }
};

const compPlayHandler = () => {
  const target = state.computerPlayer.randomPlay();
  const result = state.computerPlayer.attackEnemy(state.humanPlayer, target);
  const shipType = getShipType(result, target);
  renderAttack('active', target, shipType, result);
  if (result === 'hit') checkIfSunk(state.humanPlayer, 'active', target);
  // check for winner
  switchActivePlayer();
  toggleCompPlayBtn();
};

const placeFleetHandler = () => {
  const humanShipCoords = placeHumanShips();
  placeComputerShips();
  clearUI();
  gameView();
  renderShips(humanShipCoords);
  addHandlerHumanPlay(humanPlayHandler);
  addHandlerCompPlay(compPlayHandler);
};

const startHandler = () => {
  clearUI();
  placeFleetView();
  footer();
  addHandlerPlaceFleet(placeFleetHandler);
};

export { startHandler };
