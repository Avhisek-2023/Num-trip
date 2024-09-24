import { useEffect, useRef } from "react";

const App = () => {
  const availableArray = [];

  const chosenArray = [];

  const gameValue = [];
  // const matrixRef = useRef([], [], [], [], []);

  useEffect(() => {
    initializeAvailableArray(7);
    initializeChosenArray();
    randomizeMatrix();
    console.log(chosenArray.length);
    // console.log(matrixRef.current);
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

  const randomizeMatrix = () => {
    for (let i = 0; i < 25; i++) {
      gameValue[i] =
        chosenArray[Math.floor(Math.random() * chosenArray.length)];
    }
  };

  return (
    <div className="container w-full h-auto my-40">
      <div className="flex flex-wrap w-1/2 lg:w-1/4"></div>
      {/* <div
        className="flex flex-row flex-nowrap h-8"
        ref={(div) => (matrixRef.current[0] = div)}
      >
        <div
          className="w-12  border-2 border-red-400 text-center"
          ref={(div) => (matrixRef.current[0] = div)}
        ></div>
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
        q
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
      </div> */}
    </div>
  );
};

export default App;
