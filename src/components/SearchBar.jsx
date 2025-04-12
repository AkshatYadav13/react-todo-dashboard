import { useEffect, useMemo, useState } from "react";
import { debounce } from "../utils";

const SearchBar = ({ searchFn }) => {
  const [text, setText] = useState("");
  const debouncedSearchFn = useMemo(() => debounce(searchFn, 500), [searchFn]);

  useEffect(() => {
    debouncedSearchFn(text);
  }, [text, debouncedSearchFn]);

  return (
    <input
      className="searchBar input"
      type="text"
      placeholder="start searching"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default SearchBar;
