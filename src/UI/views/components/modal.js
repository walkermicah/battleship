const createModal = () => {
  const newModal = document.createElement('div');
  newModal.classList.add('modal');
  return newModal;
};

const closeBtn = () => {
  const btn = document.createElement('button');
  btn.classList.add('close-modal-btn');
  btn.innerHTML = '&#10005';
  return btn;
};

export default function modal(text) {
  const newModal = createModal();
  newModal.textContent = text;
  newModal.appendChild(closeBtn());
  return newModal;
}
