import { Link } from "react-router-dom";
function Modal({ id, children }) {
  console.log(id);
  return (
    <>
      <div className="modal" id={id}>
        <div className="modal-box w-4/12 relative">
          <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </a>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
