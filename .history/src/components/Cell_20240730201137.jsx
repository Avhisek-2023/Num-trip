/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const Cell = (props) => {
  //class name for setting color to numbers
  const nameClass = (e) => {
    console.log(e);
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
        return "text-blue-900";
      case 2048:
        return "text-slate-900";
      case 4096:
        return "text-red-900";
      case 8192:
        return "text-violet-900";
      case 16392:
        return "text-orange-900";
      case 32784:
        return "text-pink-800";
      default:
        return `text-${getRandomColor()}-500`;
    }
  };

  //generates random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color.slice(1);
  };

  const setNum = (num) => {
    if (num >= 1000 && num < 100000) {
      return Math.floor(num / 1000) + "k";
    } else {
      return num;
    }
  };
  return (
    <motion.div
      className={
        nameClass(props.number) +
        " w-14 h-14 py-3   m-1 text-xl font-bold text-center  ease-in-out bg-blue-100 border-2 border-blue-900 rounded-full cursor-pointer hover:bg-indigo-200"
      }
      initial={{ scale: 1 }}
      whileTap={{ scale: 1.5 }}
      transition={{ duration: 1.4 }}
      onClick={() => props.setStoreHit({ row: props.i, col: props.j })}
    >
      {/* {props.number} */}
      {setNum(props.number)}
    </motion.div>
  );
};

export default Cell;
