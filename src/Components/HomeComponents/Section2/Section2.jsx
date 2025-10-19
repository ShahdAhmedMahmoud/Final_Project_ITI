import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Section2 = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/data/home.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => setServices(data.services ))
      .catch((err) => console.error("Error:", err));
  }, []);

  if (services.length === 0) {
    return <p className="text-center">Loading...</p>;
  }

  const first = services[0];
  const second = services[1];

  return (
    <div>
    
      <div className="w-24 mx-auto mb-4">
        <img
          src="/images/home/075ae30a43e0a65b6e3f4e5ec76bb89edb6c8904.jpg"
          alt="Top"
          className="w-full"
        />
      </div>

     
      <div className="container text-center mx-auto mb-8">
        <h1 className="font-semibold text-xl md:text-3xl mx-auto">
          {first.title}
        </h1>
        <hr className="w-1/4 border border-black mx-auto my-4" />
        <p className="mx-auto  mb-[50px]">{first.description}</p>
        {/* {first.image && (
          <img src={first.image} alt={first.title} className="mx-auto" />
        )} */}
      </div>

    
      <div className="container mx-auto mb-8 bg-[#f8f8f8] p-4 rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="self-start">
            <h1 className="font-semibold text-xl md:text-3xl mx-auto my-4">
              {second.title}
            </h1>
            <p className="mx-auto">{second.description}</p>
            <button className="bg-black text-white px-4 py-2 rounded my-4 hover:bg-gray-800 transition">
              <Link to="/contact">
                REQUEST A CONSULTATION{" "}
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </Link>
            </button>
          </div>
          <div className="relative border border-black h-96 overflow-visible">
            {second.image && (
              <img
                src={second.image}
                className="absolute -top-6 -left-5 w-full h-full object-cover shadow-lg"
                alt={second.title}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;

