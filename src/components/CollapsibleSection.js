import React, { useState } from "react";

const CollapsibleSection = ({ year, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-xl font-bold text-blue-600 py-2"
      >
        {year}
      </button>
      {isOpen && (
        <div className="pl-4 border-l-4 border-blue-600">
          {Object.keys(content).map((month, index) => (
            <div key={index} className="relative group mb-4">
              <div className="text-sm font-semibold text-blue-600 mb-2">
                {month}
              </div>
              {content[month].map((item, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="font-bold text-blue-600">{item.type}</h3>
                  <ul className="list-disc list-inside">
                    {item.details.map((detail, idy) => (
                      <li key={idy} className="text-gray-700">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
