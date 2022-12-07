const views = document.querySelector('.views');

export default function view(className) {
  const newView = views.appendChild(document.createElement('div'));
  newView.classList.add('view', `${className}`);
  return newView;
}
