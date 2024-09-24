import { motion } from "framer-motion";
const Cell = (props) => {
  const nameClass = (e) => {
    switch (e) {
      case 2:
        return "text-red-500";
      case 4:
        return "text-yellow-500";
      case 8:
        return "text-green-500";
      case 16:
        return "text-blue-500";
      case 32:
        return "text-orange-500";
      case 64:
        return "text-pink-500";
      case 128:
        return "text-violet-500";
      case 256:
        return "text-indigo-500";
      case 512:
        return "text-white-500";
      case 1024:
        return "text-gray-700";
      default:
        return `text-${getRandomColor()}-500`;
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
    <motion.div
      className={
        nameClass(props.number) +
        " w-14 h-14 py-3 delay-300 m-1 text-xl font-bold text-center transition duration-500 ease-in-out bg-blue-100 border-2 border-blue-900 rounded-full cursor-pointer hover:bg-indigo-200"
      }
      initial={{ scale: 1 }}
      whileTap={{ scale: 1.7 }}
      onClick={() => props.setStoreHit({ row: props.i, col: props.j })}
    >
      {props.number}
    </motion.div>
  );
};

export default Cell;
