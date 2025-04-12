const Pagination = ({ currPage, total_pages, onChange }) => {
  return (
    <div className="pagination">
      {currPage !== 1 && (
        <button onClick={() => onChange(currPage - 1)}>Prev</button>
      )}
      <div className="page-series">
        {Object.keys(Array(total_pages).fill(""))
          .map((n) => +n + 1)
          .map((num, idx) => (
            <span
              key={`${num}_${idx}`}
              className={`${num === currPage ? "active" : ""}`}
              onClick={() => onChange(num)}
            >
              {num}
            </span>
          ))}
      </div>
      {currPage !== total_pages && (
        <button onClick={() => onChange(currPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
