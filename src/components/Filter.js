import React from "react";

const Filter = ({ iconTypes, selectedIconTypes, onFilterChange }) => {
  return (
    <div className="flex justify-center mb-6">
      {iconTypes.map((iconType) => (
        <label key={iconType} className="mx-2">
          <input
            type="checkbox"
            checked={selectedIconTypes.includes(iconType)}
            onChange={(e) => onFilterChange(iconType, e.target.checked)}
          />
          <span className="ml-2">{iconType}</span>
        </label>
      ))}
    </div>
  );
};

export default Filter;
