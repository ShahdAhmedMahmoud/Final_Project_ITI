import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faHouse, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import './footer.css'

 function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  const socialIcons = {
    twitter: faTwitter,
    instagram: faInstagram,
    facebook: faFacebook,
  };

  useEffect(() => {
    fetch("/data/footer.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch footer data");
        }
        return res.json();
      })
      .then((data) => {
        setFooterData(data.footer);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching footer data:", err);
        setLoading(false);
      });
  }, []);

  

  if (!footerData) {
    return <p>Failed to load footer data</p>;
  }

  const { contact, links, instagram, callSection } = footerData;

  return (
    <footer>
      <div className="up-part-footer">
        <img
          className="up-part-footer-img"
          src="/images/footer/Rectangle-21.jpg"
          alt=""
        />
          <p className="p-contact">Contact us for more details</p>
          <Link to="/contact">
            <button className="button-contact">
              CONTACT US <span style={{ fontSize: "10px" }}>{">"}</span>
            </button>
          </Link>
      </div>

      <div className="down-footer">
        <img
          className="down-footer-img"
          src="/images/footer/Footer-down.jpg"
          alt=""
        />

        {/* Container 1 */}
        <div className="down-container-1">
          <img
            className="arthouse-img"
            src="/images/footer/arthouse.png"
            alt="arthouse"
          />

          <p>
            <FontAwesomeIcon icon={faHouse} className="icon-1 mr-2" />
            {contact.address}
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="icon-1 mr-2" />
            {contact.email}
          </p>
          <p>Follow us:</p>
          <div className="logos">
            {contact.socials.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="websites"
              >
                <FontAwesomeIcon
                  icon={socialIcons[social.platform]}
                  size="lg"
                  className="mr-3"
                  style={{ transition: "0.3s" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </a>
            ))}
          </div>
        </div>

        {/* Container 2 - Links */}
        <div className="down-container-2">
          {links.map((link, index) => (
            <a key={index} className="a-links" href="#">
              <p className="p-links">{link}</p>
            </a>
          ))}
        </div>

        {/* Container 3 - Instagram */}
        <div className="down-container-3">
          <h2>INSTAGRAM</h2>
          <div className="insta-photos">
            {instagram.slice(1).map((img, index) => (
              <img
                key={index}
                className="photos"
                src={img}
                alt={`instagram-${index}`}
                style={{ transition: "0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            ))}
          </div>
        </div>

        {/* Container 4 - Call Section */}
        <div className="down-container-4">
          <p className="call-word">{callSection.title}</p>
          <p className="call-num">
            <FontAwesomeIcon icon={faPhone} className="mr-2 pb-3" /> &#124;{" "}
            {callSection.phone}
          </p>
          <p className="text-gray-300">{callSection.description}</p>
          <p className="call-num mb-3 text-sm">{callSection.copyright}</p>
        </div>
      </div>
    </footer>
    
  );
}




export default Footer ;

