import view from './components/view';
import grid from './components/grid';
import banner from './components/banner';
import fleet from './components/fleet';
import animatedBtn from './components/animatedBtn';

export default function placeFleetView() {
  const gridView = view('place-fleet-grid-view');
  gridView.appendChild(grid('place-fleet-grid'));

  const fleetView = view('place-fleet-view');
  fleetView.appendChild(banner('h2', 'Place your ships'));
  fleetView.appendChild(fleet());
  fleetView.appendChild(animatedBtn(['place-fleet-btn'], '&rarr;'));
}
