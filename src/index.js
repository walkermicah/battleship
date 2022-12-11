import './style.css';
import init from './app/init';
import * as handlers from './app/handlerFunctions';

init();

const clickTarget = (e, className) =>
  e.target.classList.contains(className) ||
  e.target.parentNode.classList.contains(className);

document.addEventListener('click', (e) => {
  if (clickTarget(e, 'start-btn')) handlers.startGame();

  if (clickTarget(e, 'place-fleet-btn')) handlers.placeFleet();

  if (clickTarget(e, 'grid-hole')) {
    handlers.humanPlay(e);
  }

  if (clickTarget(e, 'play-again-btn')) handlers.playAgain();
});
