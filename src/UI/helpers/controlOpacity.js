const display = document.querySelector('.display');

const fadeDisplay = () => {
  display.style.opacity = 0.25;
};

const restoreDisplay = () => {
  display.style.opacity = 1;
};

export { fadeDisplay, restoreDisplay };
