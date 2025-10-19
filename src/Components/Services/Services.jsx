import React, { useEffect, useState } from "react";
import "./services.css";


const Services = () => {
  const [services, setServices] = useState([]);
  const [instagrams, setInstagrams] = useState([]);

  useEffect(() => {
    fetch("/data/services.json") 
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setInstagrams(data.instagrams);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <>
    
    <div className="banner flex items-center justify-center text-center p-6 md:p-8 lg:p-36 relative">
        <p className="text-2xl md:text-3xl font-bold text-white z-10 relative">
          We believe that outstanding customer experiences are a direct result
          of{" "}
          <span className="green-color">intentional</span>{" "}
          <span className="green-color">planning</span> and{" "}
          <span className="green-color">pro activity</span> at the outset of
          every project.
        </p>
        <div className="overlay absolute inset-0"></div>
      </div>
    <div className="services-container px-6 space-y-16">
      <div  className="space-y-16">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-8`}
          >
            <div className="flex-1 space-y-4">
              <h2 className="text-5xl font-bold text-gray-800 mb-8">
                {service.number} {service.title}
              </h2>
              <p className="text-xl mt-10">{service.description}</p>
            </div>

            <div className="flex-1 w-full h-[500px] overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full shadow-lg object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>

     
      <div  className="text-center">
        <h2 className="text-5xl font-bold text-gray-800 text-center border-b-2 inline-block mx-auto">
          FIND US ON INSTAGRAM
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[50px]">
          {instagrams.map((img, index) => (
            <div key={index} className="w-full h-64 overflow-hidden">
              <img
                src={img}
                alt={`Instagram ${index}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Services;
