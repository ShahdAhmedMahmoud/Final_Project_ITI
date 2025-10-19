import { useEffect, useState } from "react";
import "./AboutUs.css";

function AboutUs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/aboutUs.json")
      .then((res) => res.json())
      .then((info) => setData(info));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
    <div>
      
      <section className="main">
        <p
          className="line"
          dangerouslySetInnerHTML={{ __html: data.main.text }}
        />
      </section>

      {/* Who We*/}
      <section className="section who">
        <img src={data.whoWeAre.logo} alt="Logo" className="who-logo" />
        <h2 className="title">{data.whoWeAre.title}</h2>
        <div className="divider"></div>
        {data.whoWeAre.description.map((line, i) => (
          <p key={i} className="story">{line}</p>
        ))}
      </section>

      {/* Stats */}
      <section className="section stats">
        {data.stats.map((stat, i) => (
          <div key={i} className="stat">
            <h3 className="num">{stat.num}</h3>
            <p className="label">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Leadership */}
      <section className="section about-container">
        <h2 className="section-title">Leadership</h2>
        <div className="leaders">
          {data.leadership.map((leader, i) => (
            <div key={i} className="leader-card">
              <img src={leader.photo} alt={leader.name} className="leader-photo" />
              <h3 className="leader-name">{leader.name}</h3>
              <p className="leader-role">{leader.role}</p>
              <p className="leader-bio">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Insta */}
      <section className="section about-container">
        <h2 className="insta-title">Find Us On Instagram</h2>
        <div className="insta-section">
          {data.instagram.map((img, i) => (
            <img key={i} src={img} alt={`insta-${i}`} className="insta" />
          ))}
        </div>
      </section>
    </div>
    </>

  );
}

export default AboutUs;
