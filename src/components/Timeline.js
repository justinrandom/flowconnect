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

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedProjects((prev) =>
      prev.includes(value)
        ? prev.filter((project) => project !== value)
        : [...prev, value]
    );
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      setSelectedProjects(allProjects);
    } else {
      setSelectedProjects([]);
    }
  };

  useEffect(() => {
    const allSelected = allProjects.every((project) =>
      selectedProjects.includes(project)
    );
    document.getElementById("selectAll").checked = allSelected;
  }, [selectedProjects]);

  return (
    <div className="bg-gray-200 p-3">
      <h1 className="text-3xl font-bold text-center mb-4 text-black">
        Flow Timeline
      </h1>

      <div className="flex justify-center mb-5 space-x-4 flex-wrap">
        <label className="mx-2 text-black">
          <input
            type="checkbox"
            id="selectAll"
            onChange={handleSelectAllChange}
            className="mr-1"
          />
          Select All
        </label>
        {allProjects.map((project) => (
          <label key={project} className="mx-2 text-black">
            <input
              type="checkbox"
              value={project}
              checked={selectedProjects.includes(project)}
              onChange={handleFilterChange}
              className="mr-1"
            />
            {project}
          </label>
        ))}
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
                    className="timeline-element sm:pl-10 "
                  >
                    {entry.content.map((item, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-blue-600">{item.type}</h4>
                        <ul className="list-disc list-inside">
                          {item.details.map((detail, idy) => (
                            <li key={idy} className="text-gray-700">
                              {detail}
                            </li>
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
