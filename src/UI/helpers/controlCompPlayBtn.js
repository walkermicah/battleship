const showCompPlayBtn = () => {
  const compPlayBtn = document.querySelector('.computer-play-btn');
  compPlayBtn.classList.remove('hidden');
};

const hideCompPlayBtn = () => {
  const compPlayBtn = document.querySelector('.computer-play-btn');
  compPlayBtn.classList.add('hidden');
};

export { showCompPlayBtn, hideCompPlayBtn };
