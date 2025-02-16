// App.jsx
import React from 'react';
import './App.css';
import profileImage from './assets/mypicture.jpg';
import jobPhoto from './assets/Elmhurst.png';
import github from './assets/Github-Logo.png';
import linkedIn from './assets/LinkedIn_logo_initials.png';


function App() {
  return (
    <div className="app-container">
      {/* Fixed Header */}
      <header className="main-header">
        <h1 className="name-title">Arslan Baig</h1>
        <nav className="nav-links">
          <a href="#about">About Me</a>
          <a href="#projects">Resume</a>
          <a href="#projects">Experience</a>
          <a href="#contact">Contact</a>
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
        <section id="about" className="content-section">
          <h2>About Me</h2>
          <p>Your about me content goes here...</p>
        </section>
        
        <section id="Experience" className="content-section">
          <h2>Experience</h2>
          <p>Your projects content goes here...</p>
        </section>
        
        <section id="contact" className="content-section">
          <h2>Contact</h2>
          <p>Your contact information goes here...</p>
        </section>
      </main>
    </div>
  );
}

export default App;