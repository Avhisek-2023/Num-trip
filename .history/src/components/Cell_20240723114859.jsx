const Cell = () => {
  const nameClass = (e) => {
    if (e == 2) {
      return " text-red-500 ";
    } else if (e == 4) {
      return " text-yellow-500 ";
    } else if (e == 8) {
      return " text-green-500 ";
    } else if (e == 16) {
      return " text-blue-500 ";
    } else if (e == 32) {
      return " text-orange-500 ";
    } else if (e == 64) {
      return " text-pink-500 ";
    } else if (e == 128) {
      return " text-violet-500 ";
    } else if (e == 256) {
      return " text-indigo-500 ";
    } else if (e == 512) {
      return " text-white-500 ";
    } else {
      return `text-${getRandomColor()}-500 `;
    }
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color.slice(1);
  };
  return (
    <div
      className={
        nameClass(e) +
        " w-14 h-14 py-3 delay-300 m-1 text-xl font-bold text-center transition duration-500 ease-in-out bg-blue-100 border-2 border-blue-900 rounded-full cursor-pointer hover:bg-indigo-200"
      }
      onClick={() => setStoreHit({ row: i, col: j })}
    >
      {e}
    </div>
  );
};

export default Cell;
