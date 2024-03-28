import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const ColumnFilter = ({ column }) => {
  const [value, setValue] = useState(column.filterValue || "");
  const onChange = useAsyncDebounce((value) => {
    column.setFilter(value || undefined);
  }, 500);
  //   const { filterValue, setFilter } = column;
  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};
