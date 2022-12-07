import modal from '../views/components/modal';
import { fadeDisplay, restoreDisplay } from './controlOpacity';
import toggleFooter from './toggleFooter';

const container = document.querySelector('.container');

const showModal = (text, html) => {
  container.appendChild(modal(text, html));
  fadeDisplay();
  toggleFooter();
};

const closeModal = () => {
  container.removeChild(container.lastChild);
  restoreDisplay();
  toggleFooter();
};

export { showModal, closeModal };
