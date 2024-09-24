import { useEffect, useState } from "react";

const App = () => {
  const [availableArray, setAvailableArray] = useState([]);
  const [chosenArray, setChosenArray] = useState([]);
  const [gameValue, setGameValue] = useState([]);
  const [twoDValue, setTwoDValue] = useState([[]]);
  const [loading, setLoading] = useState(true);
  const [storeIndex, setStoreIndex] = useState([]);
  const [storeHit, setStoreHit] = useState({});

  useEffect(() => {
    initializeAvailableArray(7);
  }, []);

  useEffect(() => {
    if (availableArray.length > 0) {
      initializeChosenArray();
    }
  }, [availableArray]);

  useEffect(() => {
    if (chosenArray.length > 0) {
      randomizeMatrix();
    }
  }, [chosenArray]);

  useEffect(() => {
    if (gameValue.length > 0) {
      convert2D();
    }
  }, [gameValue]);

  useEffect(() => {
    if (twoDValue.length > 0) {
      // const available = checkChange();
      // if (!available) {
      //   console.log(
      //     "Element not present is ",
      //     twoDValue[storeHit.row][storeHit.col]
      //   );
      // }
      // console.log(storeHit);
      checkChange();
      setLoading(false);
    }
  }, [twoDValue]);

  useEffect(() => {
    if (storeHit.row !== undefined) {
      let temp = storeHit;
      storeUpperAndLower(temp);
    }
  }, [storeHit]);

  useEffect(() => {
    if (storeIndex.length > 0) {
      let tempTwoDValue = [...twoDValue];
      storeIndex.forEach((e) => {
        if (
          e.i == storeHit.row &&
          e.j == storeHit.col &&
          twoDValue[e.i][e.j] <= chosenArray[1]
        ) {
          tempTwoDValue[e.i][e.j] = 2 * twoDValue[e.i][e.j];
        } else {
          tempTwoDValue[e.i][e.j] =
            chosenArray[Math.floor(Math.random() * chosenArray.length)];
        }
      });
      setTwoDValue((prev) => tempTwoDValue);
    }
  }, [storeIndex]);

  const storeUpperAndLower = (temp) => {
    const tempUpandLow = [];
    for (let i = temp.row; i >= 0; i--) {
      if (twoDValue[temp.row][temp.col] == twoDValue[i][temp.col]) {
        tempUpandLow.push({ i: i, j: temp.col });
      } else {
        break;
      }
    }
    for (let i = temp.row + 1; i < 5; i++) {
      if (twoDValue[temp.row][temp.col] == twoDValue[i][temp.col]) {
        tempUpandLow.push({ i: i, j: temp.col });
      } else {
        break;
      }
    }
    tempUpandLow.forEach((e) => {
      for (let k = e.j - 1; k >= 0; k--) {
        if (twoDValue[temp.row][temp.col] == twoDValue[e.i][k]) {
          tempUpandLow.push({ i: e.i, j: k });
        } else {
          break;
        }
      }
      for (let k = e.j + 1; k < 5; k++) {
        if (twoDValue[temp.row][temp.col] == twoDValue[e.i][k]) {
          tempUpandLow.push({ i: e.i, j: k });
        } else {
          break;
        }
      }
    });
    setStoreIndex((prev) => tempUpandLow);
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
    setTwoDValue(() => tempTwoDValue);
  };

  const checkChange = () => {
    if (storeHit) console.log("Function called");
  };

  const nameClass = (e) => {
    if (e == 2) {
      return "px-6 py-4 m-1 text-xl text-red-500 font-bold text-center transition duration-300 ease-in-out bg-blue-100 border-2 border-blue-900 rounded-full cursor-pointer hover:bg-indigo-200";
    } else if (e == 4) {
      return "px-6 py-4 m-1 text-xl text-yellow-500 font-bold text-center transition duration-300 ease-in-out bg-blue-100 border-2 border-blue-900 rounded-full cursor-pointer hover:bg-indigo-200";
    } else {
      return "px-6 py-4 m-1 text-xl text-green-500 font-bold text-center transition duration-300 ease-in-out bg-blue-100 border-2 border-blue-900 rounded-full cursor-pointer hover:bg-indigo-200";
    }
  };
  return loading ? (
    <>Loading..</>
  ) : (
    <div className="container flex flex-col items-center justify-center w-full h-auto my-40">
      <div className="p-2 border-4 shadow-lg shadow-inner shadow-cyan-900 border-cyan-800 bg-slate-300 rounded-xl">
        {twoDValue.map((row, i) => (
          <div className="flex w-1/2 lg:w-1/4 " key={i}>
            {row.map((e, j) => (
              <div
                className={nameClass(e)}
                key={j}
                onClick={() => setStoreHit({ row: i, col: j })}
              >
                {e}
              </div>
            ))}
          </div>
        ))}
      </div>

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
//"px-6 py-4 m-1 text-xl text-red-500 font-bold text-center transition duration-300 ease-in-out bg-blue-100 border-2 border-blue-900 rounded-full cursor-pointer hover:bg-indigo-200"
