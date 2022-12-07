import animatedBtn from './components/animatedBtn';
import { fadeDisplay } from '../helpers/controlOpacity';
import toggleFooter from '../helpers/toggleFooter';

const announceWinner = (winner) => {
  const heading = document.querySelector('h1');
  const winnerText = winner === 'player' ? 'You win!' : 'Computer wins!';
  heading.textContent = winnerText;
};

const showPlayAgainBtn = () => {
  const container = document.querySelector('.container');
  container.appendChild(
    animatedBtn(['play-again-btn'], 'PLAY AGAIN &nbsp; &rarr;')
  );
};

export default function endView(winner) {
  fadeDisplay();
  announceWinner(winner);
  showPlayAgainBtn();
  toggleFooter();
}
