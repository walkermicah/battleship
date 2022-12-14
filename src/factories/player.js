import gameboard from './gameboard';

export default function player() {
  const board = gameboard();
  const positions = [...Array(100).keys()];
  const attacks = [];
  const attackQueue = [];

  // Methods for computer player target selection
  const randomPlay = () => {
    const filteredMoves = positions.filter(
      (position) => !attacks.includes(position)
    );
    return filteredMoves[Math.floor(Math.random() * filteredMoves.length)];
  };

  const smartPlay = () => {
    let target;
    if (attackQueue.length > 0) {
      const nextInQueue = attackQueue[0].at(-1);
      if (attacks.includes(nextInQueue)) attackQueue.shift();
      target = attackQueue[0].at(-1);
    } else {
      target = randomPlay();
    }
    return target;
  };

  const nextHMoveValid = (coord) => (coord + 1).toString().slice(-1) !== '0';

  const nextVMoveValid = (coord) => coord + 10 < 100;

  const prevHMoveValid = (coord) =>
    (coord - 1).toString().slice(-1) !== '9' && coord - 1 >= 0;

  const prevVMoveValid = (coord) => coord - 10 >= 0;

  const queueNextMoves = (coord) => {
    // if coord is already in the queue, add next target to the chain
    const coordIsInQueue = attackQueue.flat().includes(coord);
    if (coordIsInQueue) {
      const sequence = attackQueue.find((el) => el.includes(coord));

      if (sequence[0] - sequence[1] === 1 && prevHMoveValid(coord)) {
        sequence.push(coord - 1);
      }
      if (sequence[0] - sequence[1] === -1 && nextHMoveValid(coord)) {
        sequence.push(coord + 1);
      }
      if (sequence[0] - sequence[1] === 10 && prevVMoveValid(coord)) {
        sequence.push(coord - 10);
      }
      if (sequence[0] - sequence[1] === -10 && nextVMoveValid(coord)) {
        sequence.push(coord + 10);
      }
    } else {
      // Get next valid horizontal and vertical moves
      const nextMoves = [[], []];
      if (prevHMoveValid(coord)) nextMoves[0].push([coord, coord - 1]);
      if (nextHMoveValid(coord)) nextMoves[0].push([coord, coord + 1]);
      if (prevVMoveValid(coord)) nextMoves[1].push([coord, coord - 10]);
      if (nextVMoveValid(coord)) nextMoves[1].push([coord, coord + 10]);

      // Randomly choose whether to attack horizontally or vertically first
      const orientation = Math.floor(Math.random() * 2);

      // Push valid moves to queue
      attackQueue.push(...nextMoves[orientation]);

      if (orientation === 0) {
        attackQueue.push(...nextMoves[1]);
      } else {
        attackQueue.push(...nextMoves[0]);
      }
    }
  };

  const updateQueue = (enemy, result, target) => {
    if (result === 'hit') {
      const shipIsSunk = enemy.board.positions[target].isSunk();
      if (shipIsSunk) {
        attackQueue.length = 0;
      } else {
        queueNextMoves(target);
      }
    }
    if (result === 'miss') attackQueue.shift();
  };

  // Attack other player's gameboard
  const attackEnemy = (enemy, target, computerPlayer = false) => {
    if (attacks.includes(target)) return;
    const result = enemy.board.receiveAttack(target);

    if (computerPlayer) updateQueue(enemy, result, target);

    attacks.push(target);
    return result;
  };

  // Methods for computer player ship selection
  const filterInvalidCoords = (orientation, length) => {
    if (orientation === 'horizontal') {
      const filteredCoords = [];
      for (let i = 0; i < 10; i++) {
        filteredCoords.push(
          positions.filter(
            (coord) => coord >= i * 10 && coord < i * 10 + (11 - length)
          )
        );
      }
      return filteredCoords.flat();
    }

    if (orientation === 'vertical') {
      return positions.filter((coord) => coord < 100 - (length - 1) * 10);
    }
  };

  const filterOverlapCoords = (
    availableCoords,
    occupiedCoords,
    orientation,
    length
  ) => {
    const occupied = [];

    availableCoords.forEach((coord) => {
      for (let i = 0; i < length; i++) {
        const increment =
          orientation === 'horizontal' ? coord + i : coord + i * 10;
        if (occupiedCoords.includes(increment)) occupied.push(coord);
      }
    });

    return availableCoords.filter((coord) => !occupied.includes(coord));
  };

  const randomOrientation = () => {
    const orientations = ['horizontal', 'vertical'];
    return orientations[Math.floor(Math.random() * 2)];
  };

  const randomCoord = (coords) =>
    coords[Math.floor(Math.random() * coords.length)];

  // Generate random coordinates for computer ships
  const generateCompCoords = () => {
    const ships = {
      carrier: 5,
      battleship: 4,
      cruiser: 3,
      submarine: 3,
      destroyer: 2,
    };

    const occupiedCoords = [];

    Object.keys(ships).forEach((ship) => {
      const orientation = randomOrientation();

      const noInvalidCoords = filterInvalidCoords(orientation, ships[ship]);
      const noOverlapCoords = filterOverlapCoords(
        noInvalidCoords,
        occupiedCoords,
        orientation,
        ships[ship]
      );

      const startCoord = randomCoord(noOverlapCoords);

      const coords = [];

      for (let i = 0; i < ships[ship]; i++) {
        if (orientation === 'horizontal') coords.push(startCoord + i);
        if (orientation === 'vertical') coords.push(startCoord + i * 10);
      }

      ships[ship] = coords;
      occupiedCoords.push(...coords);
    });

    return ships;
  };

  // Place player's ships on gameboard
  const positionShips = (coords = generateCompCoords()) => {
    Object.keys(coords).forEach((ship) => {
      board.addShipToBoard(ship, coords[ship]);
    });
  };

  return {
    board,
    attacks,
    attackQueue,
    smartPlay,
    updateQueue,
    attackEnemy,
    generateCompCoords,
    filterInvalidCoords,
    filterOverlapCoords,
    positionShips,
  };
}
