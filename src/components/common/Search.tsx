import { useProductList } from "@/lib/store";
import { debounce } from "lodash";
import React from "react";
import { MdSearch } from "react-icons/md";
import { Input } from "../ui/input";

const Search = (props: { placeholder: string }) => {
  const setQuery = useProductList((state) => state.setQuery);
  const query = useProductList((state) => state.query);

  const debouncedSetQuery = React.useMemo(
    () => debounce((query: string) => setQuery(query), 500),
    [setQuery]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetQuery(event.target.value);
  };

  return (
    <span className=" my-auto flex items-center h-fit border-[1px] border-gray-50/40 rounded-md px-3 text-gray-50 focus-within:ring-[1px] focus-within:ring-gray-50/80">
      <MdSearch className="text-2xl" />
      <Input
        className="border-none focus-visible:ring-0"
        placeholder={props.placeholder}
        onChange={handleChange}
      />
    </span>
  );
};

export default Search;
