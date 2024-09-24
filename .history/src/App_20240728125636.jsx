/* eslint-disable react/prop-types */
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
  const [k, setK] = useState(0);
  //Game load useeffect
  useEffect(() => {
    initializeAvailableArray(7);
  }, []);

  //Available Useeffect
  useEffect(() => {
    if (availableArray.length > 0) {
      initializeChosenArray();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableArray]);

  //choosen array Useeffect
  useEffect(() => {
    if (chosenArray.length > 0) {
      randomizeMatrix();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenArray]);

  //Gamevalue Useeffect
  useEffect(() => {
    if (gameValue.length > 0) {
      convert2D();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameValue]);

  //twoDvalue Useeffect
  useEffect(() => {
    if (twoDValue.length > 0) {
      let x = checkAvail();
      if (x) {
        setLoading(false);
      } else {
        const arr = [...availableArray];
        arr.splice(0, 1);
        setAvailableArray(() => arr);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twoDValue]);

  //storehit Useeffect
  useEffect(() => {
    if (storeHit.row !== undefined) {
      let temp = storeHit;
      storeUpperAndLower(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeHit]);

  //Adjacent Useeffect
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

      setTwoDValue(() => tempTwoDValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeIndex]);

  //Adjacent Index
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
    // console.log("uplow", uniqueArr);
    setStoreIndex(() => uniqueArr);
  };

  //Determines if any moves are available or not.
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

  //Stores the highest value in board at the end of game.
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

  //Available Array Init
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

  //Choosen Array Init
  const initializeChosenArray = () => {
    let tempChosenArray = [];
    tempChosenArray[0] = availableArray[0];
    tempChosenArray[1] = availableArray[1];
    tempChosenArray[2] = availableArray[2];
    setChosenArray(tempChosenArray);
  };

  //Matrix Randomization
  const randomizeMatrix = () => {
    let tempGameValue = [];
    if (!k) {
      tempGameValue = [
        4, 8, 4, 4, 8, 4, 8, 4, 8, 8, 4, 8, 4, 4, 4, 4, 4, 8, 8, 8, 8, 4, 8, 4,
        8,
      ];
      setK(1);
    }

    // for (let i = 0; i < 25; i++) {
    //   tempGameValue[i] =
    //     chosenArray[Math.floor(Math.random() * chosenArray.length)];
    // }
    setGameValue(tempGameValue);
  };

  //Conversion of 1D to 2D
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

  //shuffles 2D array
  const shuffle2D = () => {
    const new1D = [];
    const visited = [];
    const shuffled1D = [];
    const shuffled2D = [];
    let k = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        new1D[k++] = twoDValue[i][j];
      }
    }
    for (let i = 0; i < 25; ) {
      var x = Math.floor(Math.random() * 25);
      if (!visited[x]) {
        shuffled1D[i] = new1D[x];
        i++;
        visited[x] = true;
      }
    }
    let count = 0;
    for (let i = 0; i < 5; i++) {
      shuffled2D[i] = [];
      for (let j = 0; j < 5; j++) {
        shuffled2D[i][j] = shuffled1D[count];
        count++;
      }
    }

    setTwoDValue(() => shuffled2D);
    setModal(() => false);
  };

  //Checks if Choosen Array 0th index is available in board or not.
  const checkAvail = () => {
    console.log("called");
    var element = chosenArray[0];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (element == twoDValue[i][j]) {
          return true;
        }
      }
    }
    return false;
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
      {modal && <Modal highest={highest} shuffle2D={shuffle2D} />}
    </div>
  );
};

export default App;
