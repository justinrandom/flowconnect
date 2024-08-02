import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import nbaImage from "../nba.png";
import topshotImage from "../topshot.png";
import evaluate from "../evaluate.png";
import nflad from "../nflad.png";
import wnbatopshot from "../wnbatopshot.png";
import { contentByYear } from "./content";
import FlowTimeline from "../FlowTimeline.svg";

const getIconDetails = (iconType) => {
  switch (iconType) {
    case "NBA":
      return { background: "black", icon: nbaImage };
    case "TopShot":
      return { background: "white", icon: topshotImage };
    case "Evaluate":
      return { background: "white", icon: evaluate };
    case "NFLAD":
      return { background: "white", icon: nflad };
    case "WNBATopShot":
      return { background: "white", icon: wnbatopshot };
    default:
      return { background: "gray", icon: null };
  }
};

const Timeline = () => {
  const allProjects = ["NBA", "TopShot", "Evaluate", "NFLAD", "WNBATopShot"];
  const [selectedProjects, setSelectedProjects] = useState(allProjects);

  const handleFilterChange = (value) => {
    setSelectedProjects((prev) =>
      prev.includes(value)
        ? prev.filter((project) => project !== value)
        : [...prev, value]
    );
  };

  const handleSelectAllChange = () => {
    setSelectedProjects(allProjects);
  };

  const handleUnselectAllChange = () => {
    setSelectedProjects([]);
  };

  return (
    <div className="bg-gray-300 p-3">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-700 border border-black p-2 rounded-lg">
          <img src={FlowTimeline} alt="Flow Timeline" className="h-16" />
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg mb-5">
        <div className="flex justify-center mb-2 text-white space-x-2 flex-wrap">
          <button
            onClick={handleSelectAllChange}
            className="bg-gray-500 text-white py-1 px-2 rounded-lg text-sm md:text-lg md:py-2 md:px-4 focus:outline-none"
          >
            Select All
          </button>
          <button
            onClick={handleUnselectAllChange}
            className="bg-gray-500 text-white py-1 px-2 rounded-lg text-sm md:text-lg md:py-2 md:px-4 focus:outline-none"
          >
            Unselect All
          </button>
        </div>
        <div className="flex justify-center text-white space-x-2 flex-wrap">
          {allProjects.map((project) => (
            <button
              key={project}
              onClick={() => handleFilterChange(project)}
              className={`mx-1 py-1 px-2 rounded-lg text-sm md:text-lg md:py-2 md:px-4 focus:outline-none ${
                selectedProjects.includes(project)
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            >
              {project}
            </button>
          ))}
        </div>
      </div>

      <VerticalTimeline>
        {Object.keys(contentByYear).flatMap((year) =>
          Object.keys(contentByYear[year]).flatMap((date) =>
            contentByYear[year][date]
              .filter((entry) => selectedProjects.includes(entry.iconType))
              .map((entry, idx) => {
                const { background, icon } = getIconDetails(entry.iconType);
                return (
                  <VerticalTimelineElement
                    key={`${year}-${date}-${idx}`}
                    date={date}
                    iconStyle={{
                      background,
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    contentStyle={{ background: "#f9fafb", color: "#333" }}
                    contentArrowStyle={{ borderRight: "15px solid #f9fafb" }}
                    icon={
                      <div className="w-full h-full flex justify-center items-center">
                        <img
                          src={icon}
                          alt={entry.iconType}
                          className="object-contain w-full h-full rounded-full"
                        />
                      </div>
                    }
                    className="timeline-element sm:pl-24 md:pl-8 lg:pl-7"
                  >
                    {entry.content.map((item, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-blue-600">{item.type}</h4>
                        <ul className="list-disc list-inside">
                          {item.details.map((detail, idy) => (
                            <li
                              key={idy}
                              className="text-gray-700"
                              dangerouslySetInnerHTML={{ __html: detail }}
                            ></li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </VerticalTimelineElement>
                );
              })
          )
        )}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
