function Button({ styles, children, ...props }) {
  return (
    <button className={`btn ${styles}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
