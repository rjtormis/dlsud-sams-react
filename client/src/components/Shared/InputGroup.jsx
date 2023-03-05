function InputGroup({ styles, icon, ...props }) {
  return (
    <div className="input-group">
      <span>{icon}</span>
      <input className={`input input-bordered w-full ${styles}`} {...props} />
    </div>
  );
}

export default InputGroup;
