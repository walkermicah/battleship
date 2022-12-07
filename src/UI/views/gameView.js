import view from './components/view';
import legend from './components/legend';
import grid from './components/grid';

export default function gameView() {
  const activeView = view('game-view-active');
  activeView.appendChild(legend('active'));
  activeView.appendChild(grid('active-grid'));

  const enemyView = view('game-view-enemy');
  enemyView.appendChild(grid('enemy-grid'));
  enemyView.appendChild(legend('enemy'));
}
