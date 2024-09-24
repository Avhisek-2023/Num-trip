import { useEffect } from "react";

const App = () => {
  const availableArray = [];
  useEffect(() => {
    initializeAvailableArray(7);
    initializeChosenArray();
    console.log(availableArray);
  }, []);
  const initializeAvailableArray = (i) => {
    for (let j = 0; j < i; j++) {
      if (j == 0) {
        availableArray[j] = 2;
      } else {
        availableArray[j] = availableArray[j - 1] * 2;
      }
    }
  };

  return (
    <div className="container w-full h-auto flex flex-col items-center my-40">
      <div className="flex flex-row flex-nowrap h-8">
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
      </div>
      <div className="flex flex-row flex-nowrap h-8">
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
      </div>
      <div className="flex  h-8 flex-row flex-nowrap">
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
      </div>
      <div className="flex  h-8 flex-row flex-nowrap">
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
      </div>
      <div className="flex h-8 flex-row flex-nowrap">
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
      </div>
    </div>
  );
};

export default App;
