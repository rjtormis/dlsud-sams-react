function Input({ styles, ...props }) {
  return <input className={`input input-bordered w-full ${styles}`} {...props} />;
}

export default Input;
