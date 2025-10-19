import React, { useEffect, useState } from "react";
import "./section1.css";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetch("/data/home.json")
      .then((res) => res.json())
      .then((data) => setHeroData(data.hero))
      .catch((err) => console.error("Error loading hero.json:", err));
  }, []);

  if (!heroData) return <p>Loading...</p>;

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">{heroData.subtitle}</p>
        <h1 className="hero-title">
          {heroData.title} <span>{heroData.highlight}</span>
        </h1>
      </div>



      <div className="hero-services">
        {heroData.services.map((service, index) => (
          <div className="service-card" key={index}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
