import { useState } from "react";
import logo from "../assets/img/LOGO2.png"
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

const MobileMenu = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-10 lg:hidden">
      <div className="w-full bg-white border-b border-gray-200 py-2 px-5">
        <div className="flex items-center justify-between">
          <div className="max-w-[70px] max-h-[70px]">
            <a href="#">
              <img src={logo} alt="Logo"/>
            </a>
          </div>
          <div className="cursor-pointer" onClick={() => setToggle(!toggle)}>
            <div>
              <div className="w-[30px]">
                {toggle ? <RxCross1 size={30} /> : <RxHamburgerMenu size={30} /> }
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full bg-white ${toggle ? "block" : "hidden"}`}>
        <div className="py-6 px-5">
          <ul className="list-none m-0">
            <li className="w-full">
              <a href="#beranda" className="block text-black font-medium py-2">Beranda</a>
            </li>
            <li className="w-full">
              <a href="#Peringkat" className="block text-black font-medium py-2">Peringkat</a>
            </li>
            <li className="w-full">
              <a href="#Perhitungan" className="block text-black font-medium py-2">Perhitungan</a>
            </li>
          </ul>
          {/* Uncomment the following block if you need the download button */}
          {/* <div className="pt-5">
            <a href="#" className="text-white bg-[#f75023] rounded-full py-2 px-10">Download CV</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
