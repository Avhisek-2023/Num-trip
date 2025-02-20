import "./Modal.css";
function Modal(props) {
  console.log(props);

  return (
    <div>
      <div className="modal-wrapper"></div>
      <div className="modal-container">
        <img src="../../public/images/victory.gif" className="win-img" alt="" />
        <div className="text-center text">
          Congratulations! Your score was {props.highest}
        </div>
        <div className="text-center my-2">
          <button
            className="mb-3 text-white p-2 rounded-xl bg-red-400"
            onClick={() => {
              location.reload();
            }}
          >
            Play Again
          </button>
          <button
            className="mb-3 text-white p-2 rounded-xl mx-4  bg-green-400"
            onClick={() => {
              location.reload();
            }}
          >
            Watch Ad
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
