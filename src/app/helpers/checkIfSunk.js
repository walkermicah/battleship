import renderSunkShip from '../../UI/helpers/renderSunkShip';

export default function checkIfSunk(player, playerStatus, target) {
  const ship = player.board.positions[target];
  if (ship.isSunk()) renderSunkShip(playerStatus, ship.type);
}
