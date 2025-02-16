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
import githubLogo from './assets/github-logo.png'; // Add GitHub logo import
import phreddit from './assets/phreddit.png'; 
import neural from './assets/nn.png'; 
import stock from './assets/stock.png'; 


const Project = () => {
  const techStack = [
    { category: 'Languages', logos: [jsLogo, javaLogo,pythonLogo, csLogo, cLogo, sqlLogo, htmlLogo, cssLogo] },
    { category: 'Frameworks', logos: [reactLogo, nodeLogo, netLogo, flaskLogo, bootstrapLogo, kerasLogo, tensorflowLogo, numpyLogo] },
  ];
  const projects = [
    {
      title: "Phreddit",
      image: phreddit,
      description: "Mock-Reddit Website Made in JavaScript with React, Node, Express & Connected to a MongoDB server",
      githubLink: "https://github.com/arbaig12/Fake-Reddit"
    },
    {
      title: "Neural Network",
      image: neural,
      description: "Created a Neural Network From Scratch using Numpy for Matrix manipulation. Utilized NN for classification problems",
      githubLink: "https://github.com/arbaig12/Neural-Network-From-Scratch"
    },
    {
      title: "Stock Market Predictor",
      image: stock,
      description: "Utilized Keras & TensorFlow to Project Stock Price Ranges via Neural Network and Random Forest. ",
      githubLink: "https://github.com/arbaig12/Stock-Predict"
    }
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
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image" 
            />
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              <img 
                src={githubLogo} 
                alt="GitHub" 
                className="github-logo" 
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;