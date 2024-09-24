import { useEffect, useRef } from "react";

const App = () => {
  const availableArray = [];

  const chosenArray = [];

  const matrixRef = useRef([[], [], [], [], []]);

  useEffect(() => {
    initializeAvailableArray(7);
    initializeChosenArray();
    console.log(matrixRef.current[0][1]);
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

  const initializeChosenArray = () => {
    chosenArray[0] = availableArray[0];
    chosenArray[1] = availableArray[1];
    chosenArray[2] = availableArray[2];
  };

  return (
    <div className="container w-full h-auto flex flex-col items-center my-40">
      <div
        className="flex flex-row flex-nowrap h-8"
        ref={(div) => (matrixRef.current[0] = div)}
      >
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
      </div>
      <div
        className="flex flex-row flex-nowrap h-8"
        ref={(div) => (matrixRef.current[1] = div)}
      >
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
      </div>
      <div
        className="flex  h-8 flex-row flex-nowrap"
        ref={(div) => (matrixRef.current[2] = div)}
      >
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
      </div>
      <div
        className="flex  h-8 flex-row flex-nowrap"
        ref={(div) => (matrixRef.current[3] = div)}
      >
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
        <div className="w-12  border-2 border-red-400 text-center"></div>
      </div>
      <div
        className="flex h-8 flex-row flex-nowrap"
        ref={(div) => (matrixRef.current[4] = div)}
      >
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
