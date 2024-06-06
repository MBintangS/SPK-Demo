import { LuLogOut } from "react-icons/lu";
import logo from "../assets/img/LOGO2.png";
import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {useNavigate} from "react-router-dom"

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const mySwal = withReactContent(Swal);
  const navigate = useNavigate()

  const swal = () => {
    mySwal.fire({
      // title: "Apakah Kamu Mau Keluar?",
      text: "Apakah Kamu Mau Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya",
      cancelButtonText: "Kembali"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/")
      }
    });
  };
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <aside className="h-screen fixed">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-5 flex justify-between items-center">
           <div className="flex items-center w-full">
            <img
              src={logo}
              className={`overflow-hidden transition-all ${
                expanded ? "w-20" : "w-0"
              }`}
            />
             <p
              className={`overflow-hidden transition-all text-xl ps-3 ${
                expanded ? "w-32" : "w-0"
              }`}
            >Sistem Pendukung Keputusan</p>
           </div>
            {/* <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <LuChevronFirst /> : <LuChevronLast />}
            </button> */}
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img src={logo} className="w-10 h-10 rounded-md" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-48 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4 ps-1">
                <p className="font-medium text-base">Admin</p>
                {/* <span className="text-xs text-gray-600">
                  constgenius@gmail.com
                </span> */}
              </div>
              <LuLogOut size={20} className="text-red-500 cursor-pointer" onClick={swal} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, onClick }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-3 px-3 my-1 font-normal text-base rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-success to-green-600 text-white"
          : "hover:bg-green-50 text-gray-600"
      }`}
      onClick={onClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-48 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
