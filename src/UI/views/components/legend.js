import banner from './banner';
import animatedBtn from './animatedBtn';

const createLegend = (player) => {
  const newLegend = document.createElement('div');
  newLegend.classList.add('legend', `${player}-legend`);
  return newLegend;
};

const heading = (player) => {
  const text = player === 'active' ? 'Your ships' : 'Enemy ships';
  return banner('h3', text);
};

const legendContent = () => {
  const content = document.createElement('div');
  content.classList.add('legend-ships');

  const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];

  ships.forEach((type) => {
    const ship = content.appendChild(document.createElement('div'));
    ship.classList.add('ship', `${type}`);
    ship.appendChild(document.createElement('span'));

    const label = content.appendChild(document.createElement('p'));
    label.classList.add(`${type}`);
    label.textContent = `${type[0].toUpperCase() + type.slice(1)}`;
  });

  return content;
};

const computerPlayBtn = () =>
  animatedBtn(['computer-play-btn', 'hidden'], '&rarr;');

export default function legend(player) {
  const newLegend = createLegend(player);
  newLegend.appendChild(heading(player));
  newLegend.appendChild(legendContent());
  if (player === 'enemy') newLegend.appendChild(computerPlayBtn());
  return newLegend;
}
