import React from 'react';
import './Project.css';
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
import githubLogo from './assets/github-logo.png';
import phreddit from './assets/phreddit.png';
import neural from './assets/nn.png';
import stock from './assets/stock.png';

const techStack = [
  {
    category: 'Languages',
    logos: [jsLogo, javaLogo, pythonLogo, csLogo, cLogo, sqlLogo, htmlLogo, cssLogo],
  },
  {
    category: 'Frameworks',
    logos: [reactLogo, nodeLogo, netLogo, flaskLogo, bootstrapLogo, kerasLogo, tensorflowLogo, numpyLogo],
  },
];

const projects = [
  {
    title: 'Phreddit',
    image: phreddit,
    description: 'Full-stack Reddit clone built with React, Node, Express, and MongoDB. Features posts, comments, nested threads, and user authentication.',
    githubLink: 'https://github.com/arbaig12/Fake-Reddit',
  },
  {
    title: 'Neural Network',
    image: neural,
    description: 'Neural network built from scratch using NumPy for matrix operations. Implements forward/backpropagation and solves multi-class classification problems.',
    githubLink: 'https://github.com/arbaig12/Neural-Network-From-Scratch',
  },
  {
    title: 'Stock Market Predictor',
    image: stock,
    description: 'LSTM and Random Forest models using Keras & TensorFlow to forecast stock price ranges with technical indicator feature engineering.',
    githubLink: 'https://github.com/arbaig12/Stock-Predict',
  },
];

const Project = () => {
  return (
    <div className="tech-stack-container">
      {/* Tech Stack Table */}
      <table className="tech-stack-table">
        <thead>
          <tr>
            <th colSpan="2" className="table-header">Tech Stack</th>
          </tr>
        </thead>
        <tbody>
          {techStack.map((row, i) => (
            <tr key={i} className="tech-category">
              <td className="category-name">{row.category}</td>
              <td className="tech-logos">
                <div className="logos-grid">
                  {row.logos.map((logo, j) => (
                    <img key={j} src={logo} alt="tech logo" className="tech-logo" loading="lazy" width="48" height="48" />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Project Cards */}
      <div className="projects-grid">
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-card"
            data-reveal
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <img src={project.image} alt={project.title} className="project-image" loading="lazy" width="400" height="180" />

            {/* Always-visible title bar at bottom */}
            <div className="project-title-bar">
              <h3 className="project-title">{project.title}</h3>
            </div>

            {/* Slide-up overlay on hover */}
            <div className="project-overlay">
              <h3 className="project-overlay-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                <img src={githubLogo} alt="GitHub" className="github-logo" />
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
