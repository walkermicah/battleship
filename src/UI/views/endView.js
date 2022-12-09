import animatedBtn from './components/animatedBtn';
import { fadeDisplay } from '../helpers/controlOpacity';
import toggleFooter from '../helpers/toggleFooter';
import { hideCompPlayBtn } from '../helpers/controlCompPlayBtn';
import changeHeaderText from '../helpers/changeHeaderText';

const announceWinner = (winner) => {
  const winnerText = winner === 'human' ? 'You win!' : 'Computer wins!';
  changeHeaderText(winnerText);
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
  hideCompPlayBtn();
}
