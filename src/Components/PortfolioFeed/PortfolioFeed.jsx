import React, { useEffect, useState } from "react";

import './profile feed.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


function PortfolioFeed() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/profile-feed.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch portfolio data");
        return res.json();
      })
      .then((data) => {
        setPortfolioData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching portfolio data:", err);
        setLoading(false);
      });
  }, []);

  
  if (!portfolioData) return <p>Failed to load portfolio data</p>;

  const pf = portfolioData["profile-page"]["p-f-container"];
  const wp = portfolioData["work-photos"];
  const building = portfolioData["biulding"];
  const cards = portfolioData.cards.items;

  return (
    <>
      <div id="app">
        {/* Portfolio Feed Container */}
        <div className={pf.class}>
          {pf.images.map((img, index) => (
            <img key={index} className={img.class} src={img.src} alt={img.alt} />
          ))}
          <p style={{ color: "#9acd32", fontSize: "24px" }}>OUR</p>
          <p>interior design portfolio</p>
        </div>

        {/* Work Photos */}
        <div className={wp.class}>
          {wp.items.map((item, index) => {
            let content = null;
            if (item.type === "div") {
              content = (
                <div className="img-link">
  <img src={item.src} alt={item.alt || "work"} />
  <div className="text-link">
    <p>design services we offer</p>
    <Link className="link" to="/portfolio">
<FontAwesomeIcon icon={faArrowRight} />    </Link>
  </div>
</div>

              );
            } else if (item.src) {
              content = <img src={item.src} alt={item.alt} />;
            } else if (item.block) {
              content = (
                <div>
                  <img src={item.block.img.src} alt={item.block.img.alt} />
                  <p>{item.block.p}</p>
                </div>
              );
            }
            return <React.Fragment key={index}>{content}</React.Fragment>;
          })}
        </div>

        {/* Building */}
        <div className={building.class}>
          <h2>{building.title}</h2>
        </div>

        {/* Cards */}
        <div className="cards">
          {cards.map((c, index) => (
            <div key={index} className="advantages">
              <div className="card-head">{c["card-head"]}</div>
              <ul className="card-pros">
                {c["card-pros"].map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}


export default PortfolioFeed;
