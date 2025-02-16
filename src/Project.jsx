import React from 'react';
import './Project.css';
// Import your technology logos
import jsLogo from './assets/js.png';
import pythonLogo from './assets/python.png';
import cLogo from './assets/c.png';
import csLogo from './assets/cs.png';
import htmlLogo from './assets/html.png';
import cssLogo from './assets/css.png';
import javaLogo from './assets/java.png';
import sqlLogo from './assets/sql.png';
import reactLogo from './assets/react.png';
import nodeLogo from './assets/node.png';
import netLogo from './assets/net.png';
import flaskLogo from './assets/flask.png';
import bootstrapLogo from './assets/boot.png';
import kerasLogo from './assets/keras.png';
import tensorflowLogo from './assets/tensorflow.png';
import numpyLogo from './assets/numpy.png';


const Project = () => {
  const techStack = [
    { category: 'Languages', logos: [jsLogo, javaLogo,pythonLogo, csLogo, cLogo, sqlLogo, htmlLogo, cssLogo] },
    { category: 'Frameworks', logos: [reactLogo, nodeLogo, netLogo, flaskLogo, bootstrapLogo, kerasLogo, tensorflowLogo, numpyLogo] },
  ];

  return (
    <div className="tech-stack-container">
      <table className="tech-stack-table">
        <thead>
          <tr>
            <th colSpan="2" className="table-header">Tech-Stack</th>
          </tr>
        </thead>
        <tbody>
          {techStack.map((category, index) => (
            <tr key={index} className="tech-category">
              <td className="category-name">{category.category}</td>
              <td className="tech-logos">
                <div className="logos-grid">
                  {category.logos.map((logo, logoIndex) => (
                    <img 
                      key={logoIndex}
                      src={logo} 
                      alt="tech-logo" 
                      className="tech-logo" 
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Project;