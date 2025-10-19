import React, { useEffect, useState } from 'react'

const Portfolio = () => {

  const [data,setData] = useState({});
  const [loading,setLoading] = useState(true);

  useEffect(() =>{
    fetch('/data/portfolio.json')
    .then(res => res.json())
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(error => {
      console.log('error fetching data, ' + error);
      setLoading(false);
    });
  },[]);

  if(loading) return <p>Loading.......</p> ;
  return (
  <>
    <header className="w-full bg-[url('/images/portfolio-images/bg.jpg')] h-[60vh] bg-cover bg-center">
      <div className="bg-[#0E1B1B9C] w-full h-full flex justify-center items-center">
        <h1 id="tittle" className="text-white font-medium text-5xl">{data.tittle}</h1>
      </div>
    </header>

    <section className="mt-8 flex flex-col items-center">
      <img className="w-24 h-24 my-4" src={data.iconUrl} alt="icon"/>
      <hr className="w-1/4 border border-black" />
      <p className="text-center font-semibold text-lg w-3/4 my-7">{data.descriptions?.description1}</p>
      <p className="text-center font-semibold text-lg w-3/4 mb-10">{data.descriptions?.description2}</p>
    </section>

    <div className="container mx-auto my-10  sm:px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.images?.map((img,index) => (
          <div key={index}>
            <img className="w-full aspect-[1/1] object-cover" src={img} alt="image"/>
          </div>
        ))}
      </div>
    </div>

    <section className="container mx-auto ">
      <div className="flex flex-col items-center my-10 py-10">
        <p className="text-center text-5xl font-medium border-b-2 border-black pb-2">
          Building Amenities
        </p>
      </div>

      <div className="grid grid-cols-1 mx-8 sm:mx-0 min-w-[250px] gap-5 mb-10 pb-10
      sm:grid-cols-2 
      md:grid-cols-3
      lg:grid-cols-4">
        {data.amenities?.map((amen,index) => (
          <div key={index} className="bg-[#F8F8F8]  aspect-auto sm:aspect-[1/1] p-6">
            <div className="w-[50px] h-[50px] bg-[#90B300] text-center text-[35px] flex items-center justify-center mb-4"><i className={amen.icon}></i></div>
            <span className="text-[#90B300]">Amenities</span>
            <h5 className="font-medium text-xl"><u>{amen.name}</u></h5>
            <p className="mt-10 font-medium text-2xl">{amen.description}</p>
          </div>
        ))}
      </div>
    </section>
    
  </>
);

}

export default Portfolio