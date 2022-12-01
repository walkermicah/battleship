const ship = (coords) => {
  const length = coords.length;
  const damage = [];

  const getCoords = () => coords;

  const getDamage = () => damage;

  const hit = (coord) => {
    if (coords.includes(coord) && !damage.includes(coord)) damage.push(coord);
  };

  const isSunk = () => damage.length === length;

  return {
    getCoords,
    getDamage,
    hit,
    isSunk,
  };
};

export { ship };
