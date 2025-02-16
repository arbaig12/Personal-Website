// App.jsx
import React from 'react';
import './App.css';
import profileImage from './assets/mypicture.jpg';
import jobPhoto from './assets/Elmhurst.png';
import github from './assets/Github-Logo.png';
import linkedIn from './assets/LinkedIn_logo_initials.png';
import { useState, useRef } from 'react';



function App() {
  const [showResume, setShowResume] = useState(false);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  const handleNavClick = (e, sectionRef) => {
    e.preventDefault();

    // If the resume is visible, hide it before navigating to the section
    if (showResume) {
      setShowResume(false);
    }

    // Scroll to the selected section
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    
    <div className="app-container">
      {/* Fixed Header */}
      <header className="main-header">
        <h1 className="name-title">Arslan Baig</h1>
        <nav className="nav-links">
          <a href="#about" onClick={(e) => handleNavClick(e, aboutRef)}>About Me</a>
          <a
            href="#resume"
            onClick={(e) => {
              e.preventDefault();
              setShowResume(!showResume);
            }}
          >
            {showResume ? 'Back to Main' : 'Resume'}
          </a>
          <a href="#experience" onClick={(e) => handleNavClick(e, experienceRef)}>Experience</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, contactRef)}>Contact</a>
        </nav>
      </header>

      {/* Fixed Sidebar */}
      <aside className="sidebar">
        <div className="profile-section">
          <img 
            src={profileImage}
            alt="Profile" 
            className="profile-image"
          />
          <p>Software Engineer</p>
          <div className="social-media">
            <a 
              href="https://github.com/arbaig12" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src={github} 
                alt="GitHub" 
                className="social-icon" 
              />
            </a>
            <a 
              href="https://www.linkedin.com/in/arslanbaig12/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src={linkedIn} 
                alt="LinkedIn" 
                className="social-icon" 
              />
            </a>
          </div>
        </div>
      </aside>

      {/* Scrollable Main Content */}
      <main className="content-area">
        {showResume ? (
          <div className="resume-viewer">
            <iframe title="Resume" src="public/Resume.pdf" width="100%" height="100%">
              <p>Your browser does not support PDFs.
                <a href="public/Resume.pdf">Download Resume</a>
              </p>
            </iframe>
          </div>
        ) : (
          <>
            <section id="about" ref={aboutRef} className="content-section">
              <h2>About Me</h2>
              <p>Your about me content goes here...</p>
            </section>

            <section id="experience" ref={experienceRef} className="content-section">
              <h2>Experience</h2>
              <p>Your experience content goes here...</p>
            </section>

            <section id="contact" ref={contactRef} className="content-section">
              <h2>Contact</h2>
              <p>Your contact information goes here...</p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;