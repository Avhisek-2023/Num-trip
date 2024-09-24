import { useState } from "react";
import "./Modal.css";
function Modal(props) {
  console.log(props);
  const [life, setLife] = useState(2);

  return (
    <div>
      <div className="modal-wrapper"></div>
      <div className="modal-container">
        <img src="../../public/images/victory.gif" className="win-img" alt="" />
        <div className="text-center text">
          Congratulations! Your score was {props.highest}
        </div>
        <div className="my-2 text-center">
          <button
            className="p-2 mb-3 text-white bg-red-400 rounded-xl"
            onClick={() => {
              location.reload();
            }}
          >
            Play Again
          </button>
          <button
            className="p-2 mx-4 mb-3 text-white bg-green-400 rounded-xl"
            onClick={() => {
              props.shuffle2D();
            }}
          >
            {life > 0 ? "Use Life" : "No Available Life"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
