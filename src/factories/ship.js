const ship = (coords) => {
  const length = coords.length;
  const damage = [];

  const getDamage = () => damage;

  const hit = (coord) => {
    if (coords.includes(coord) && !damage.includes(coord)) damage.push(coord);
  };

  const isSunk = () => damage.length === length;

  return {
    getDamage,
    hit,
    isSunk,
  };
};

export { ship };
