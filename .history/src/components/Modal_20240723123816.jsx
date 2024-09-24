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
        <div className="text-center">
          <button
            className="mb-3 text-green-500 btn"
            onClick={() => {
              location.reload();
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
