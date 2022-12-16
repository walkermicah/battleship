import modal from '../views/components/modal';
import { fadeDisplay, restoreDisplay } from './controlOpacity';
import toggleFooter from './toggleFooter';

const container = document.querySelector('.container');

const showModal = (text) => {
  container.appendChild(modal(text));
  fadeDisplay();
  toggleFooter();
};

const closeModal = () => {
  if (container.lastChild.classList.contains('modal')) {
    container.removeChild(container.lastChild);
  }
  restoreDisplay();
  toggleFooter();
};

export { showModal, closeModal };
