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

export default function modal(text, html) {
  const newModal = createModal();
  text ? (newModal.textContent = text) : (newModal.innerHTML = html);
  newModal.appendChild(closeBtn());
  return newModal;
}
