function SectionsPagination({ style_div, totalItems, ItemPerPage, setCurrentPage, currentPage }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / ItemPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={`btn-group self-center justify-self-center mt-4 ${style_div}`}>
      {pages.map((page, index) => (
        <button
          key={index}
          className={`btn ${page === currentPage ? "btn-active" : ""}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default SectionsPagination;
