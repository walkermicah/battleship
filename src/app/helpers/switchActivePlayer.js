import { state } from '../state';

export default function switchActivePlayer() {
  [state.activePlayer, state.enemyPlayer] = [
    state.enemyPlayer,
    state.activePlayer,
  ];
}
