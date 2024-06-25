import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchInput({ id, placeholder, onChange }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    const { currentTarget: { value } } = e;
    setValue(value);
    onChange(value);
  }

  return (
    <div className="w-full flex items-center gap-2 mb-3">
      <FaSearch className="text-2xl" />
      <input
        id={id}
        className="flex-1 text-xl p-3 border-2 shadow-md rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}