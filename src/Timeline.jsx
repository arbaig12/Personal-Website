import React from "react";
import "./Timeline.css";

const timelineData = [
  {
    title: "B.S. Computer Science Honors & AMS",
    company: "Stony Brook University",
    date: "Expected May 2026",
    type: "education",
  },
  {
    title: "Software Engineer Intern",
    company: "NYC Health + Hospitals",
    date: "May 2024 – Present",
    type: "experience",
  },
  {
    title: "Data Structures & Algorithms TA",
    company: "Stony Brook University",
    date: "Jan 2024 – May 2024",
    type: "experience",
  },
  {
    title: "Information Technology Intern",
    company: "Derive Technologies",
    date: "Dec 2022 – Jan 2023",
    type: "experience",
  },
  {
    title: "High School Diploma",
    company: "Brooklyn Technical High School",
    date: "2018 – 2022",
    type: "education",
  },
];

const Timeline = () => {
  return (
    <div className="timeline-vertical">
      <div className="timeline-spine" />
      {timelineData.map((item, i) => {
        const side = i % 2 === 0 ? "left" : "right";
        return (
          <div
            key={i}
            className={`timeline-row ${side}`}
            data-reveal
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Left column */}
            <div className="timeline-col timeline-col-left">
              {side === "left" && (
                <div className={`timeline-card ${item.type}`}>
                  <span className={`tl-badge ${item.type}`}>{item.type}</span>
                  <h3 className="tl-title">{item.title}</h3>
                  <p className="tl-company">{item.company}</p>
                  <p className="tl-date">{item.date}</p>
                </div>
              )}
            </div>

            {/* Center dot */}
            <div className="timeline-center">
              <div className={`timeline-dot ${item.type}`} />
            </div>

            {/* Right column */}
            <div className="timeline-col timeline-col-right">
              {side === "right" && (
                <div className={`timeline-card ${item.type}`}>
                  <span className={`tl-badge ${item.type}`}>{item.type}</span>
                  <h3 className="tl-title">{item.title}</h3>
                  <p className="tl-company">{item.company}</p>
                  <p className="tl-date">{item.date}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
