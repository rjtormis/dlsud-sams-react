function Loader({ type, style_div }) {
  return (
    <div className={style_div}>
      {type}
      <p className="text-md mt-4">Please be patient while we are retreiving our data.</p>
    </div>
  );
}

export default Loader;
