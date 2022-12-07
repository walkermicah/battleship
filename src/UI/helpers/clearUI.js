export default function clearUI() {
  const views = document.querySelector('.views');
  while (views.hasChildNodes()) views.removeChild(views.lastChild);
}
