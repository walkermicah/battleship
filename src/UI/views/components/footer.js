import info from '../../../assets/img/info.svg';

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

export default function footer() {
  const newFooter = createFooter();
  newFooter.appendChild(infoBtn());
}
