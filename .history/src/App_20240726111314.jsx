import { useEffect, useState } from "react";
import Cell from "./components/Cell";
import Modal from "./components/Modal";

const App = () => {
  const [availableArray, setAvailableArray] = useState([]);
  const [chosenArray, setChosenArray] = useState([]);
  const [gameValue, setGameValue] = useState([]);
  const [twoDValue, setTwoDValue] = useState([[]]);
  const [loading, setLoading] = useState(true);
  const [storeIndex, setStoreIndex] = useState([]);
  const [storeHit, setStoreHit] = useState({});
  const [move, setMove] = useState(true);
  const [highest, setHighest] = useState(0);
  const [modal, setModal] = useState(false);

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
    if (storeIndex.length <= 1) {
      moves();
      console.log(move);
      if (!move) {
        storeHighest();
        setModal(() => true);
      }

      return;
    }
    if (storeIndex.length > 1) {
      let tempTwoDValue = [...twoDValue];

      storeIndex.forEach((e) => {
        if (e.i == storeHit.row && e.j == storeHit.col) {
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
    const tempLeftAndRight = [];
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
          tempLeftAndRight.push({ i: e.i, j: k });
          tempUpandLow.push({ i: e.i, j: k });
        } else {
          break;
        }
      }
      for (let k = e.j + 1; k < 5; k++) {
        if (twoDValue[temp.row][temp.col] == twoDValue[e.i][k]) {
          tempUpandLow.push({ i: e.i, j: k });
          tempLeftAndRight.push({ i: e.i, j: k });
        } else {
          break;
        }
      }
    });

    tempLeftAndRight.forEach((e) => {
      console.log(e);
      for (let i = e.i - 1; i >= 0; i--) {
        if (twoDValue[temp.row][temp.col] == twoDValue[i][e.j]) {
          tempUpandLow.push({ i: i, j: e.j });
        } else {
          break;
        }
      }
      for (let i = e.i + 1; i < 5; i++) {
        if (twoDValue[temp.row][temp.col] == twoDValue[i][e.j]) {
          tempUpandLow.push({ i: i, j: e.j });
        } else {
          break;
        }
      }
    });

    const uniqueArr = [];
    // console.log("ipper", tempLeftAndRight);
    tempUpandLow.forEach((obj) => {
      if (
        !uniqueArr.some(
          (uniqueObj) => JSON.stringify(uniqueObj) === JSON.stringify(obj)
        )
      ) {
        uniqueArr.push(obj);
      }
    });
    console.log("uplow", uniqueArr);
    setStoreIndex((prev) => uniqueArr);
  };
  const moves = () => {
    const rows = twoDValue.length;
    const cols = twoDValue[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const currentValue = twoDValue[i][j];
        if (j < cols - 1 && currentValue === twoDValue[i][j + 1]) {
          setMove(true);
          return;
        }
        if (j > 0 && currentValue === twoDValue[i][j - 1]) {
          setMove(true);
          return;
        }
        if (i < rows - 1 && currentValue === twoDValue[i + 1][j]) {
          setMove(true);
          return;
        }
        if (i > 0 && currentValue === twoDValue[i - 1][j]) {
          setMove(true);
          return;
        }
      }
    }
    setMove(() => false);
  };

  const storeHighest = () => {
    let h = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (twoDValue[i][j] > h) {
          h = twoDValue[i][j];
        }
      }
    }
    setHighest(h);
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

  const shuffle2D = () => {
    const new1D = [];
    let k = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        new1D[k++] = twoDValue[i][j];
      }
    }
    console.log(new1D);
  };

  return loading ? (
    <>Loading..</>
  ) : (
    <div className="container flex flex-col items-center justify-center w-full h-auto my-40">
      <div className="p-2 border-4 shadow-xl shadow-cyan-900 border-cyan-800 bg-slate-300 rounded-xl">
        {twoDValue.map((row, i) => (
          <div className="flex w-1/2 lg:w-full " key={i}>
            {row.map((e, j) => (
              <Cell key={j} number={e} setStoreHit={setStoreHit} i={i} j={j} />
            ))}
          </div>
        ))}
      </div>

      {/* <div className="flex flex-row mt-8">
        {chosenArray.map((e, i) => (
          <div
            key={i}
            className="px-6 py-4 text-xl font-bold text-center bg-blue-100 border-2 border-blue-900 cursor-pointer"
          >
            {e}
          </div>
        ))}
      </div> */}
      {modal && <Modal highest={highest} />}
    </div>
  );
};

export default App;
