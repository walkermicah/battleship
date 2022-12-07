export default function banner(size, text) {
  const newBanner = document.createElement(`${size}`);
  newBanner.classList.add('banner');
  newBanner.textContent = text;
  return newBanner;
}
