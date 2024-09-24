import { useEffect, useState } from "react";

const App = () => {
  const [availableArray, setAvailableArray] = useState([]);
  const [chosenArray, setChosenArray] = useState([]);
  const [gameValue, setGameValue] = useState([]);
  const [twoDValue, setTwoDValue] = useState([[]]);
  const [loading, setLoading] = useState(true);
  const [storeIndex, setStoreIndex] = useState([]);

  useEffect(() => {
    initializeAvailableArray(7);
  }, []);

  useEffect(() => {
    if (availableArray) {
      initializeChosenArray();
    }
  }, [availableArray]);

  useEffect(() => {
    if (chosenArray) {
      randomizeMatrix();
    }
  }, [chosenArray]);

  useEffect(() => {
    if (gameValue.length > 0) {
      convert2D();
    }
  }, [gameValue]);

  useEffect(() => {
    if (twoDValue) {
      setLoading(false);
    }
  }, [twoDValue]);

  const getColIndex = (row, col) => {
    for (let k = 0; k < 5; k++) {
      if (twoDValue[k][col] == twoDValue[row][col]) {
        setStoreIndex({ i: k, j: col });
      }
    }
    console.log(storeIndex);
  };

  const removeAdjacentSameNumber = (row, col) => {
    getColIndex(row, col);
  };
  const initializeAvailableArray = (i) => {
    let tempAvailableArray = [];
    for (let j = 0; j < i; j++) {
      if (j == 0) {
        tempAvailableArray[j] = 2;
      } else {
        tempAvailableArray[j] = tempAvailableArray[j - 1] * 2;
      }
    }
    setAvailableArray(tempAvailableArray);
  };

  const initializeChosenArray = () => {
    let tempChosenArray = [];
    tempChosenArray[0] = availableArray[0];
    tempChosenArray[1] = availableArray[1];
    tempChosenArray[2] = availableArray[2];
    setChosenArray(tempChosenArray);
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
    <div className="container flex flex-col items-center justify-center w-full h-auto my-40">
      {twoDValue.map((row, i) => (
        <div className="flex w-1/2 lg:w-1/4 " key={i}>
          {row.map((e, j) => (
            <div
              className="px-6 py-4 text-xl font-bold text-center bg-blue-100 border-2 border-blue-900 cursor-pointer"
              key={j}
              onClick={() => removeAdjacentSameNumber(i, j)}
            >
              {e}
            </div>
          ))}
        </div>
      ))}
      <div className="flex flex-row mt-8">
        {chosenArray.map((e, i) => (
          <div
            key={i}
            className="px-6 py-4 text-xl font-bold text-center bg-blue-100 border-2 border-blue-900 cursor-pointer"
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
