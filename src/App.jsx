// App.jsx
import React from 'react';
import './App.css';
import profileImage from './assets/mypicture.jpg';
import jobPhoto from './assets/Elmhurst.png';
import github from './assets/Github-Logo.png';
import linkedIn from './assets/LinkedIn_logo_initials.png';
import Timeline from './Timeline';  // Adjust the path based on your folder structure
import Project from './Project';  // Adjust the path based on your folder structure
import { useState, useRef } from 'react';



function App() {
  const [showResume, setShowResume] = useState(false);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);
  const projectRef = useRef(null);

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
          <a href="#project" onClick={(e) => handleNavClick(e, projectRef)}>Projects</a>
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
            <iframe title="Resume" src={`${process.env.PUBLIC_URL}/Resume.pdf`}  width="100%" height="100%">
              <p>Your browser does not support PDFs.
                <a href={`${process.env.PUBLIC_URL}/Resume.pdf`} >Download Resume</a>
              </p>
            </iframe>
          </div>
        ) : (
          <>
            <section id="about" ref={aboutRef} className="content-about">
              <h2>Abouta Me</h2>
              <p>
                Hello, my name is Arslan Baig. I am a Junior studying Computer Science & Applied Mathematics and Statistics at Stony Brook University and a Software Engineer Intern at NYC Health + Hospitals.  
                My passion for programming started in childhood, crafting Roblox games in Lua and designing redstone circuitry in Minecraft. These hobbies were all I would think about, yet at the time I didn’t realize that these recreational activities were shaping my problem-solving mindset.  
                In high school, as I delved into computational courses, this passion evolved beyond gaming into a lifelong pursuit of learning and innovation. Since then, every opportunity to expand my knowledge has been met with enthusiasm— a mindset I carry forward in all aspects of my career.  
              </p>
              <p>
                Over the years, I have honed my ability to develop solutions across multiple disciplines, mastering various programming languages and technologies. I find deep satisfaction in algorithm development, optimizing efficiency, and architecting large-scale projects that solve real-world problems.  
                Whether it's designing scalable systems, working with artificial intelligence, or building impactful applications, I thrive on tackling challenges that push my abilities further.  
              </p>
              <p>
                Feel free to explore the rest of my website to see my projects, experience, and skills in action. Let’s build something great together!  
              </p>
            </section>

            <section id="experience" ref={experienceRef} className="content-section">
              <h2>Experience</h2>
              <Timeline />
            </section>

            <section id="projects" ref={projectRef} className="content-section">
              <h2>Projects</h2>
              <Project />
            </section>

          
          </>
        )}
      </main>
      {!showResume && (
        <footer className="contact-footer" id = "contact" ref = {contactRef}>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <a href="tel:+19179151979">+1 (917) 915-1979</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️ </span>
              <a href="mailto:your.email@example.com">ab12person@gmail.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon"><img 
                src={linkedIn} 
                alt="LinkedIn" 
                className="social-contact-icon" 
              /> </span>
              <a href="https://www.linkedin.com/in/arslanbaig12/">  arslanbaig12</a>
            </div>
          </div>
        </footer>
      )}
      </div>

  );
}

export default App;