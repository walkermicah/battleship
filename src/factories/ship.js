const ship = (type) => {
  const shipLengths = [
    ['carrier', 5],
    ['battleship', 4],
    ['cruiser', 3],
    ['submarine', 3],
    ['destroyer', 2],
  ];

  const getLength = () => shipLengths.find((ship) => ship[0] === type)[1];

  let hits = 0;

  const getHits = () => hits;

  const hit = () => hits++;

  const isSunk = () => hits === getLength();

  return {
    type,
    getHits,
    hit,
    isSunk,
  };
};

export { ship };
