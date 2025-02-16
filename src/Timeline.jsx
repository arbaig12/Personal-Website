import React from "react";
import "./Timeline.css";

const Timeline = () => {
  const timelineData = [
    { title: "B.S. Computer Science Honors & AMS", company: "Stony Brook University", year: "2026", yearDisplay: "Expected May 2026",type: "education" },
    { title: "Software Engineer Intern", company: "NYC Health + Hospitals", year: "2025", yearDisplay: "May 2024 - Present",type: "experience" },
    { title: "Data Structure & Algorithms TA", company: "Stony Brook University", year: "2024", yearDisplay: "Jan 2024 - May 2024",type: "experience" },
    { title: "Information Technology Intern", company: "Derive Technologies", year: "2023", yearDisplay: "Dec 2022 - Jan 2023",type: "experience" },
    { title: "High School Diploma", company: "Brooklyn Technical High School", year: "2022", yearDisplay: "2018-2022", type: "education" }
  ];

  const getYearValue = (yearString) => {
    const year = yearString.match(/\d{4}/)?.[0] || 0;
    return parseInt(year);
  };

  const sortedYears = [...new Set(timelineData.map(item => getYearValue(item.year)))].sort((a, b) => a - b);

  const calculatePosition = (yearString) => {
    const year = getYearValue(yearString);
    const index = sortedYears.indexOf(year);
    return ((index) / (sortedYears.length - 1)) * 100;
  };

  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      <div className="timeline-items">
        {timelineData.map((item, index) => {
          const position = calculatePosition(item.year);
          return (
            <div
              key={index}
              className={`timeline-item ${item.type}`}
              style={{ 
                left: `${position}%`,
                marginLeft: item.type === 'education' ? '-75px' : '-75px' 
              }}
            >
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.company}</p>
                <p>{item.yearDisplay}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;