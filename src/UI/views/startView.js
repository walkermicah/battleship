import view from './components/view';
import animatedBtn from './components/animatedBtn';

export default function startView() {
  const startScreen = view('start-game-view');
  const btn = animatedBtn(['start-btn'], 'START GAME &nbsp; &rarr;');
  startScreen.appendChild(btn);
}
