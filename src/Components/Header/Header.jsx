import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    fetch("/data/header.json")
      .then((res) => res.json())
      .then((data) => setHeaderData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!headerData) {
    return null;
  }

  const { social, logo, menuButton } = headerData.header;

  const handleMenuClick = () => {
    localStorage.setItem("lastPage", window.location.pathname);
    navigate("/Menu");
  };

  return (
    <header className="bg-[#0d1918] text-white py-3 px-4 md:py-[15px] md:px-[40px] flex justify-between items-center relative">
      {/* Social Icons */}
      <div className="flex gap-5 ml-0 md:ml-[50px]">
        {social.map((s, idx) => (
          <a
            key={idx}
            className="text-white transition-transform duration-300 hover:scale-125 hover:text-[#9acd32]"
            href={s.link}
          >
            <i className={s.icon}></i>
          </a>
        ))}
      </div>

      {/* Logo */}
      <div className="font-bold text-[28px] text-center flex-1 relative">
        {logo}
      </div>

      {/* Menu Button */}
      <div
        id={menuButton.id}
        onClick={handleMenuClick}
        className="bg-[#9acd32] text-black w-10 h-10 mr-0 md:mr-10 flex justify-center items-center rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110"
      >
        <i className={menuButton.icon}></i>
      </div>
    </header>
  );
}
