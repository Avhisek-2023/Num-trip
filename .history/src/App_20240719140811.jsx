import { useEffect, useState } from "react";

const App = () => {
  const availableArray = [];
  const chosenArray = [];
  const [gameValue, setGameValue] = useState([]);
  const [twoDValue, setTwoDValue] = useState([[]]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAvailableArray(7);
    initializeChosenArray();
    randomizeMatrix();
  }, []);
  useEffect(() => {});
  useEffect(() => {
    setLoading(false);
  }, [twoDValue]);
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
    let tempGameValue = [];
    for (let i = 0; i < 25; i++) {
      tempGameValue[i] =
        chosenArray[Math.floor(Math.random() * chosenArray.length)];
    }
    setGameValue(tempGameValue);
  };

  const convert2D = () => {
    let tempTwoDValue = [];
    let count = 0;
    for (let i = 0; i < 5; i++) {
      tempTwoDValue[i] = [];
      for (let j = 0; j < 5; j++) {
        // console.log(gameValue[count]);
        tempTwoDValue[i][j] = gameValue[count];
        count++;
      }
    }
    setTwoDValue((prev) => tempTwoDValue);
  };

  return loading ? (
    <>Loading..</>
  ) : (
    <div className="container w-full h-auto my-40 justify-center items-center flex flex-col">
      {twoDValue.map((row, i) => (
        <div className="flex  w-1/2 lg:w-1/4 " key={i}>
          {row.map((e, j) => (
            <div
              className="border-2 border-blue-400 text-center px-6 py-4"
              key={j}
            >
              {e}
            </div>
          ))}
        </div>
      ))}
      {/* {gameValue.map((e, i) => (
        ))} */}
      {/* </div> */}
    </div>
  );
};

export default App;
