import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/menu.json")
      .then((res) => res.json())
      .then((data) => setMenu(data.menu))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("lastPage")) {
      localStorage.setItem("lastPage", window.location.pathname);
    }
  }, []);

  const goBack = () => {
    const lastPage = localStorage.getItem("lastPage");
    if (lastPage && lastPage !== "/Menu") {
      navigate(lastPage);
    } else {
      navigate("/");
    }
  };

  if (!menu) return null;

  return (
    <div className="relative w-full h-screen bg-[#212620] p-6 md:p-10 overflow-hidden">
      {/* Close Button */}
      <div className="absolute top-3 right-3 md:right-24 bg-[#9acd32] w-10 h-10 flex items-center justify-center cursor-pointer rounded active:scale-90">
        <button onClick={goBack} className="cursor-pointer text-black text-2xl">
          <i className={menu.closeButton.icon}></i>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-16 md:mt-24 md:ml-16 flex flex-col gap-4 md:gap-5 text-2xl md:text-3xl font-medium text-left">
        {menu.links.map((link, idx) => (
          <Link
            key={idx}
            to={link.href}
            className="text-white hover:text-[#9acd32] transition duration-300 ease-in-out"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Bottom Info Section */}
      <div className="absolute bottom-5 left-4 md:left-16 w-[90%] text-sm md:text-base">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 relative z-10">
          {/* Logo & Address / Social */}
          <div className="space-y-2 ml-4 md:ml-8 text-left">
            <img
              src={menu.logo}
              alt="Logo"
              className="w-8 md:w-10 mb-4 md:mb-6"
            />

            <p className="text-white">
              <i className="fa-solid fa-house text-[#9acd32]"></i>{" "}
              {menu.bottomInfo.address}
            </p>
            <p className="text-white">
              <i className="fas fa-envelope text-[#9acd32]"></i>{" "}
              {menu.bottomInfo.email}
            </p>

            <p className="mt-4 md:mt-7 text-white text-[23px] font-semibold">
              Follow us:
            </p>
            <div className="flex gap-4 text-lg md:text-xl">
              {menu.bottomInfo.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.link}
                  className="text-[#9acd32] hover:text-white transition"
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Call / Description / Copyright */}
          <div className="space-y-4 md:space-y-6 mt-2 text-left">
            <p className="text-[#9acd32] text-lg md:text-xl font-semibold">
              CALL US
            </p>
            <p className="text-[#9acd32]">
              <i className="fas fa-phone mr-2"></i> | {menu.bottomInfo.phone}
            </p>
            <p className="text-gray-300 text-sm md:text-base pt-2">
              {menu.bottomInfo.description}
            </p>
            <p className="text-[#9acd32] mb-3 text-xs md:text-sm pt-2">
              {menu.bottomInfo.copyright}
            </p>
          </div>
        </div>

        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center scale-[1.3] md:text-[173px] text-[100px] tracking-widest font-bold text-white opacity-10">
          {menu.backgroundText}
        </div>
      </div>
    </div>
  );
}
