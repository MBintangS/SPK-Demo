import React, { useEffect, useState } from 'react';
import logo from "../assets/img/LOGO2.png"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${isScrolled ? 'py-3 bg-white' : 'py-6'} lg:block hidden ` }>
      <div className="flex items-center justify-between w-full px-20">
        <div className="max-w-[75px] max-h-[75px]">
          <a href="#" className=''>
            <img src={logo} alt="Logo" className="" />
          </a>
        </div>
        <div className="relative">
          <ul className="flex items-center m-0 list-none">
            <li className="mr-12">
              <a href="#beranda" className="no-underline text-[#5a5a5a] hover:text-[#454545]">Beranda</a>
            </li>
            <li className="mr-12">
              <a href="#peringkat" className="no-underline text-[#5a5a5a] hover:text-[#454545]">Peringkat</a>
            </li>
            <li className="mr-0">
              <a href="#perhitungan" className="no-underline text-[#5a5a5a] hover:text-[#454545]">Perhitungan</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
