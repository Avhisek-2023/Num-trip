import { useEffect, useRef, useState } from "react";

const App = () => {
  const availableArray = [];

  const chosenArray = [];

  const gameValue = [];
  // const matrixRef = useRef([], [], [], [], []);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeAvailableArray(7);
    initializeChosenArray();
    randomizeMatrix();
    setLoading(false);
    console.log(gameValue);
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
    loading? <>Loading..</>
    <div className="container w-full h-auto my-40 justify-center flex">
      <div className="flex flex-wrap w-1/2 lg:w-1/3 border-4 border-blue-500">
        {gameValue.map((box, i) => (
          <div key={i} className="w-12  border-2 border-red-400 text-center">
            {box}
            {console.log(box)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
