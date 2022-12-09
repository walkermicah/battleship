export default function getTarget(e) {
  return e.target.closest('.grid-hole').dataset.coord;
}
