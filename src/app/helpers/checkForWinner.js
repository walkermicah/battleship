import { state } from '../state';
import endView from '../../UI/views/endView';
import { addHandlerPlayAgain } from '../../UI/addHandlers';
// import { playAgainHandler } from '../handlers';
import clearUI from '../../UI/helpers/clearUI';
import { restoreDisplay } from '../../UI/helpers/controlOpacity';
import changeHeaderText from '../../UI/helpers/changeHeaderText';
import init from '../init';

const playAgainHandler = () => {
  clearUI();
  restoreDisplay();
  changeHeaderText('Battleship');
  init();
};

export default function checkForWinner() {
  const gameOver = state.enemyPlayer.board.allSunk();
  if (!gameOver) return;
  const winner = state.activePlayer === state.humanPlayer && 'human';
  endView(winner);
  addHandlerPlayAgain(playAgainHandler);
  return winner;
}
