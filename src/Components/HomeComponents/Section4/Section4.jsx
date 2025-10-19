import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faCarSide, faSun } from "@fortawesome/free-solid-svg-icons";

import './Section4.css';


{/*This is section 5 */}
function Section5() {
  const [apartmentData, setApartmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    "fa-bed": faBed,
    "fa-bath": faBath,
    "fa-car-side": faCarSide,
    "fa-sun": faSun,
  };

  useEffect(() => {
    fetch("/data/home.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch home.json");
        return res.json();
      })
      .then((data) => {
        setApartmentData(data.apartment); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching apartment data:", err);
        setLoading(false);
      });
  }, []);

  
  if (!apartmentData) return <p>Failed to load apartment data</p>;

  const { type, features, area, image } = apartmentData;

  return (
    <>
      <div className="all-section">
        <div className="left-side-container">
          <div>
            {type.map((item, index) => (
              <span key={index} className={item.class}>
                {item.label}
              </span>
            ))}
          </div>

          <div className="descripe-table">
            {features.map((feature, index) => (
              <div key={index} className={feature.class}>
                <div>
                  <FontAwesomeIcon
                    icon={iconMap[feature.icon]}
                    className="i"
                  />
                  <span className="font-bold">{feature.name}:</span>&nbsp;
                </div>
                <span>{feature.value}</span>
              </div>
            ))}
          </div>

          <div className={area.class}>
            <p>
              <b>Internal:</b> {area.value.internal}
              <sup>2</sup>
            </p>
            <p>
              <b>External:</b> {area.value.external}
              <sup>2</sup>
            </p>
            <p>
              <b>Total:</b> {area.value.total}
              <sup>2</sup>
            </p>
          </div>
        </div>

        <div className="img-container">
          <img src={image.src} alt="" className={image.class} />
        </div>
      </div>

      
      {/* <Footer /> */}
    </>
  );
}

export default Section5;

