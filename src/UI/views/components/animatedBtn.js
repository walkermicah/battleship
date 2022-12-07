const createButton = (classList) => {
  const btn = document.createElement('button');
  btn.classList.add('animated-btn');
  classList.forEach((className) => btn.classList.add(`${className}`));
  return btn;
};

const span = (html) => {
  const newSpan = document.createElement('span');
  newSpan.innerHTML = html;
  return newSpan;
};

export default function animatedBtn(classList, html) {
  const btn = createButton(classList);
  btn.appendChild(span(html));
  return btn;
}
