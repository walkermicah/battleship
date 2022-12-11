import clearUI from '../UI/helpers/clearUI';
import placeFleetView from '../UI/views/placeFleetView';
import gameView from '../UI/views/gameView';
import footer from '../UI/views/components/footer';
import { placeComputerShips, placeHumanShips } from './placeShips';
import renderShips from '../UI/helpers/renderShips';
import { state } from './state';
import renderAttack from '../UI/helpers/renderAttack';
import getTarget from '../UI/helpers/getTarget';
import getShipType from './helpers/getShipType';
import checkIfSunk from './helpers/checkIfSunk';
import switchActivePlayer from './helpers/switchActivePlayer';
import checkForWinner from './helpers/checkForWinner';
import { restoreDisplay } from '../UI/helpers/controlOpacity';
import changeHeaderText from '../UI/helpers/changeHeaderText';
import init from './init';

export const startGame = () => {
  clearUI();
  placeFleetView();
  footer();
};

export const placeFleet = () => {
  const humanShipCoords = placeHumanShips();
  placeComputerShips();
  clearUI();
  gameView();
  renderShips(humanShipCoords);
};

export const compPlay = () => {
  const target = state.computerPlayer.randomPlay();
  const result = state.computerPlayer.attackEnemy(state.humanPlayer, target);
  const shipType = getShipType(result, target);
  renderAttack('active', target, shipType, result);
  if (result === 'hit') checkIfSunk(state.humanPlayer, 'active', target);
  if (checkForWinner()) return;
  switchActivePlayer();
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
    switchActivePlayer();
  }
  compPlay();
};

export const playAgain = () => {
  clearUI();
  restoreDisplay();
  changeHeaderText('Battleship');
  init();
};
