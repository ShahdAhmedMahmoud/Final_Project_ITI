import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const HomeSection = () => {

  const [data,setData] = useState({});
  const [loading,setLoading] = useState(true);

  useEffect(() =>{
    fetch('/data/home.json')
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
        <section className="container mx-auto ">
            <div className="flex flex-col items-center my-10 py-10">
                <p className="text-center text-5xl font-medium border-b-2 border-black pb-2 tracking-[1px]">
                Building Amenities
                </p>
            </div>

            <div className="grid grid-cols-1 min-w-[250px] mx-8 sm:mx-0 gap-5 mb-10 pb-10
            sm:grid-cols-2 
            md:grid-cols-3
            lg:grid-cols-4">
                {data.amenities?.map((amen,index) => (
                <div key={index} className="bg-[#F8F8F8] aspect-auto sm:aspect-[1/1] p-6">
                    <div className="w-[50px] h-[50px] bg-[#90B300] text-center text-[30px] flex items-center justify-center mb-4"><i className={amen.icon}></i></div>
                    <span className="text-[#90B300] tracking-[1px]">Amenities</span>
                    <h5 className="font-medium text-xl tracking-[1px]"><u>{amen.name}</u></h5>
                    <p className="mt-10 font-medium text-2xl tracking-[1px]">{amen.description}</p>
                </div>
                ))}
            </div>
        </section>

        <section className="container mx-auto mb-10 pb-10 ">
            <div className="flex flex-col items-center my-10 py-10">
                <img className="w-[60px] h-[60px] mb-4" src={data.iconUrl} alt="icon"/>
                <h2 className="text-center text-5xl font-medium border-b-2 border-black pb-2 tracking-[1px]">SEE OUR WORK</h2>
            </div>
            <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {data.projects?.map((project,index) => (
                    <div key={index}>
                        <img className="w-full aspect-[450/380] object-cover" src={project.img} alt=""/>
                        <p className="text-2xl font-semibold ms-2  mt-2 tracking-[1px]">{project.tittle}</p>
                        <p className="text-1xl font-normal ms-2 tracking-[1px]">{project.category}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="relative overflow-hidden bg-[#F8F8F8] py-10 ">
            <img className="absolute hidden xl:block z-[0] top-[200px] left-[-400px]" src="/images/home-images/side-bg-1.png" alt=""/>
            <img className="absolute hidden xl:block z-0 top-[-120px] left-[1250px]" src="/images/home-images/side-bg-2.png" alt=""/>
            <div className="flex flex-col items-center justify-center h-full my-10">
                <span className="text-[#90B300] text-base font-bold tracking-[1px]">ART HOUSE USA</span>
                <h2 className="text-[3rem] font-medium text text-center tracking-[1px]">MODERN HOME SOLUTIONS</h2>
                <p className="text-xl text-medium w-[80%] md:w-[55%] text-center mb-10 tracking-[1px]">{data.solutions}</p>
                <Link to="/contact" className="inline-block px-10 py-4 border-2 border-white ring-1 ring-black hover:border-black bg-black tracking-widest text-base font-medium text-white">REQUEST A CONSULTATION › </Link>
            </div>
        </section>
        
    </>
  )
}

export default HomeSection