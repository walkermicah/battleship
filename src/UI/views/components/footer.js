import info from '../../../assets/img/info.svg';
import sound from '../../../assets/img/sound-on.svg';

const display = document.querySelector('.display');

const createFooter = () => {
  const newFooter = display.appendChild(document.createElement('div'));
  newFooter.classList.add('footer');
  return newFooter;
};

const infoBtn = () => {
  const btn = document.createElement('button');
  btn.classList.add('instructions');
  const icon = btn.appendChild(document.createElement('img'));
  icon.src = info;
  icon.alt = 'instructions';
  return btn;
};

const soundBtn = () => {
  const btn = document.createElement('button');
  btn.classList.add('sound');
  const icon = btn.appendChild(document.createElement('img'));
  icon.src = sound;
  icon.alt = 'sound on/off';
  return btn;
};

export default function footer() {
  const newFooter = createFooter();
  newFooter.appendChild(infoBtn());
  newFooter.appendChild(soundBtn());
}
