const addHandlerStart = (fn) => {
  const startBtn = document.querySelector('.start-btn');
  startBtn.addEventListener('click', fn);
};

const addHandlerPlaceFleet = (fn) => {
  const placeFleetBtn = document.querySelector('.place-fleet-btn');
  placeFleetBtn.addEventListener('click', fn);
};

const addHandlerHumanPlay = (fn) => {
  const enemyGridHoles = document.querySelectorAll('.enemy-grid .grid-hole');
  enemyGridHoles.forEach((hole) => {
    hole.addEventListener('click', (e) => {
      fn(e);
    });
  });
};

const addHandlerCompPlay = (fn) => {
  const compPlayBtn = document.querySelector('.computer-play-btn');
  compPlayBtn.addEventListener('click', fn);
};

const addHandlerPlayAgain = (fn) => {
  const playAgainBtn = document.querySelector('.play-again-btn');
  playAgainBtn.addEventListener('click', fn);
};

export {
  addHandlerStart,
  addHandlerPlaceFleet,
  addHandlerHumanPlay,
  addHandlerCompPlay,
  addHandlerPlayAgain,
};
