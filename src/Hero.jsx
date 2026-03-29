import React, { useState, useEffect } from 'react';
import './Hero.css';

const TAGLINES = [
  'Software Engineer.',
  'CS @ Stony Brook University.',
  'Building things that matter.',
  'Always learning.',
  'Problem solver at heart.',
];

const Hero = () => {
  const [displayed, setDisplayed] = useState('');
  const [tagIdx, setTagIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [nameIn, setNameIn] = useState(false);

  useEffect(() => {
    // Delay name entrance slightly for polish
    const t = setTimeout(() => setNameIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const current = TAGLINES[tagIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(i => i + 1);
      }, 52);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(i => i - 1);
      }, 28);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTagIdx(i => (i + 1) % TAGLINES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, tagIdx]);

  return (
    <section className="hero-section">
      <div className={`hero-name-wrap ${nameIn ? 'visible' : ''}`}>
        <span className="hero-greeting">Hi, I&apos;m</span>
        <h1 className="hero-big-name">Arslan Baig</h1>
      </div>
      <div className="hero-tagline">
        <span className="hero-typed">{displayed}</span>
        <span className="hero-cursor" aria-hidden="true">|</span>
      </div>
    </section>
  );
};

export default Hero;
