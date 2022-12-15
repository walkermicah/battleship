import clearUI from '../UI/helpers/clearUI';
import placeFleetView from '../UI/views/placeFleetView';
import gameView from '../UI/views/gameView';
import footer from '../UI/views/components/footer';
import { placeHumanShips } from './placeShips';
import renderShips from '../UI/helpers/renderShips';
import { state } from './state';
import renderAttack from '../UI/helpers/renderAttack';
import getTarget from '../UI/helpers/getTarget';
import getShipType from './helpers/getShipType';
import checkIfSunk from './helpers/checkIfSunk';
import checkForWinner from './helpers/checkForWinner';
import { restoreDisplay } from '../UI/helpers/controlOpacity';
import changeHeaderText from '../UI/helpers/changeHeaderText';
import init from './init';
import getShipPlacements from '../UI/helpers/getShipPlacements';
import { showModal } from '../UI/helpers/controlModal';

export const startGame = () => {
  clearUI();
  placeFleetView();
  footer();
};

export const placeFleet = () => {
  try {
    const humanShipCoords = getShipPlacements();
    state.humanPlayer.positionShips(humanShipCoords);
    state.computerPlayer.positionShips();
    clearUI();
    gameView();
    renderShips(humanShipCoords);
  } catch (err) {
    showModal(err.message);
  }
};

export const compPlay = () => {
  const target = state.computerPlayer.smartPlay();
  const result = state.computerPlayer.attackEnemy(
    state.humanPlayer,
    target,
    true
  );
  const shipType = getShipType(result, target);
  renderAttack('active', target, shipType, result);
  if (result === 'hit') checkIfSunk(state.humanPlayer, 'active', target);
  if (checkForWinner()) return;
  state.switchActivePlayer();
};

export const humanPlay = (e) => {
  if (state.activePlayer === state.humanPlayer) {
    const target = getTarget(e);
    const result = state.humanPlayer.attackEnemy(state.computerPlayer, target);
    if (!result) return;
    const shipType = getShipType(result, target);
    renderAttack('enemy', target, shipType, result);
    if (result === 'hit') checkIfSunk(state.computerPlayer, 'enemy', target);
    if (checkForWinner()) return;
    state.switchActivePlayer();
  }
  compPlay();
};

export const playAgain = () => {
  clearUI();
  restoreDisplay();
  changeHeaderText('Battleship');
  init();
};
