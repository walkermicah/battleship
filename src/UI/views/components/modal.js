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

const modalText = (text) => {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
};

export default function modal(text) {
  const newModal = createModal();
  newModal.appendChild(closeBtn());
  newModal.appendChild(modalText(text));
  return newModal;
}
