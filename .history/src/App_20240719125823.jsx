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
    convert2D();
    setLoading(false);
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
    let tempGameValue = [];
    for (let i = 0; i < 25; i++) {
      tempGameValue[i] =
        chosenArray[Math.floor(Math.random() * chosenArray.length)];
    }
    setGameValue(tempGameValue);
  };

  return loading ? (
    <>Loading..</>
  ) : (
    <div className="container w-full h-auto my-40 justify-center flex">
      <div className="flex flex-wrap w-1/2 lg:w-1/4 ">
        {gameValue.map((e, i) => (
          <div
            className="border-2 border-blue-400 text-center px-6 py-4"
            key={i}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

// import { useEffect, useState } from "react";

// const App = () => {
//   const availableArray = [];

//   const chosenArray = [];

//   const gameValue = [];

//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     initializeAvailableArray(7);
//     initializeChosenArray();
//     randomizeMatrix();
//     setLoading(false);
//   }, []);

//   const initializeAvailableArray = (i) => {
//     for (let j = 0; j < i; j++) {
//       if (j == 0) {
//         availableArray[j] = 2;
//       } else {
//         availableArray[j] = availableArray[j - 1] * 2;
//       }
//     }
//   };

//   const initializeChosenArray = () => {
//     chosenArray[0] = availableArray[0];
//     chosenArray[1] = availableArray[1];
//     chosenArray[2] = availableArray[2];
//   };

//   const randomizeMatrix = () => {
//     for (let i = 0; i < 25; i++) {
//       gameValue[i] =
//         chosenArray[Math.floor(Math.random() * chosenArray.length)];
//     }
//   };

//   return loading ? (
//     <>Loading..</>
//   ) : (
//     <div className="container w-full h-auto my-40 justify-center flex">
//       <div className="flex flex-wrap w-1/2 lg:w-1/3 border-4 border-blue-500">
//         {gameValue.map((e, i) => (
//           <div className="border-2 border-blue-400 text-center" key={i}>
//             {e}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
