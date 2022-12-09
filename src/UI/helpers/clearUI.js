export default function clearUI() {
  const views = document.querySelector('.views');
  const container = document.querySelector('.container');
  const display = document.querySelector('.display');

  while (views.hasChildNodes()) views.removeChild(views.lastChild);

  if (container.lastElementChild.classList.contains('play-again-btn')) {
    container.removeChild(container.lastChild);
    display.removeChild(display.lastChild);
  }
}
