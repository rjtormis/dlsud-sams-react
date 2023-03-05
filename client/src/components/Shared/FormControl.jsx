function FormControl({ label, page, error, msg, children }) {
  const errorMessage = <p className={`custom-text-${page} text-error`}>{msg}</p>;
  return (
    <div className="form-control">
      <label className="label">
        <span className={`custom-text-${page} label-text`}>{label}</span>
        {error ? errorMessage : null}
      </label>
      {children}
    </div>
  );
}

export default FormControl;
