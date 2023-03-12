function Modal({ id, children }) {
  return (
    <>
      <div className="modal" id={id}>
        <div className="modal-box w-4/12 relative">
          <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2 hover:btn-error">
            ✕
          </a>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
