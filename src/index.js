import './style.css';
import init from './app/init';
import startView from './UI/views/startView';
import * as handlers from './app/handlerFunctions';
import { closeModal } from './UI/helpers/controlModal';

startView();
init();

const clickTarget = (e, className) =>
  e.target.classList.contains(className) ||
  e.target.parentNode.classList.contains(className);

const enemyGrid = (e) =>
  e.target.parentNode.parentNode.classList.contains('enemy-grid');

document.addEventListener('click', (e) => {
  if (clickTarget(e, 'start-btn')) handlers.startGame();

  if (clickTarget(e, 'place-fleet-btn')) handlers.placeFleet();

  if (clickTarget(e, 'grid-hole') && enemyGrid(e)) {
    handlers.humanPlay(e);
  }

  if (clickTarget(e, 'instructions')) handlers.showInstructions();

  if (clickTarget(e, 'play-again-btn')) handlers.playAgain();

  if (clickTarget(e, 'close-modal-btn')) closeModal();
});
