import React, { useId } from "react";

function Select({ 
  label, 
  options, 
  value, 
  className = "",
  ...props
 }, ref) {
  
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}

      <select
          type="text"
          {...props}
          id={id}
          className={`w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200-border border-gray-200
           ${className}`}
           ref={ref}
        >

        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
