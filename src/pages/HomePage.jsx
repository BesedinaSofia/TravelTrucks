import React from 'react';
import '/src/styles/Hero.css';

export default function Hero() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Campers of your dreams</h1>
          <p>You can find everything you want in our catalog</p>
          <button className="hero-button">View Now</button>
        </div>
      </section>
    </>
  );
}
