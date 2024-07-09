import {
  LuFolder,
  LuLayoutGrid,
  LuFolderTree,
  LuUser,
  LuUsers,
  LuFileEdit,
  LuCalculator,
  LuFileBarChart,
  LuUserCog,
  LuX,
} from "react-icons/lu";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // State to track visibility of the alert
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  // Function to hide the alert
  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  const [roleAdmin, setRoleAdmin] = useState(false);
  const [roleUstadz, setRoleUstadz] = useState(false);
  const [roleManagerial, setRoleManagerial] = useState(false);
  const [roleUser, setRoleUser] = useState(false)

  useEffect(() => {
    // console.log("anda sebagai", role);

    if (role === "Admin") {
      setRoleAdmin(true);
    } else if (role === "Ustadz") {
      setRoleUstadz(true);
    } else if (role === "Managerial") {
      setRoleManagerial(true);
    } else if (role === "User") {
      setRoleUser(true)
    }
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <Sidebar>
          <SidebarItem
            icon={<LuLayoutGrid size={20} />}
            text="Dashboard"
            active
            onClick={() => [navigate("/admin/dashboard")]}
          />
          <hr className="my-3" />
          {roleAdmin || roleManagerial ? (
            <SidebarItem
              icon={<LuFolder size={20} />}
              text="Data Kriteria"
              onClick={() => [navigate("/admin/data-kriteria")]}
            />
          ) : null}
          {roleAdmin || roleManagerial ? (
            <SidebarItem
              icon={<LuFolderTree size={20} />}
              text="Data Sub Kriteria"
              onClick={() => [navigate("/admin/data-sub-kriteria")]}
            />
          ) : null}
          {roleAdmin || roleManagerial ? (
            <SidebarItem
              icon={<LuUsers size={20} />}
              text="Data Alternatif"
              onClick={() => [navigate("/admin/data-alternatif")]}
            />
          ) : null}
          {roleAdmin || roleUstadz ? (
            <SidebarItem
              icon={<LuFileEdit size={20} />}
              text="Data Penilaian"
              onClick={() => [navigate("/admin/data-penilaian")]}
            />
          ) : null}
          {roleAdmin || roleUstadz ? (
            <SidebarItem
              icon={<LuCalculator size={20} />}
              text="Data Perhitungan"
              onClick={() => [navigate("/admin/data-perhitungan")]}
            />
          ) : null}
          <SidebarItem
            icon={<LuFileBarChart size={20} />}
            text="Data Hasil Akhir"
            onClick={() => [navigate("/admin/data-hasil-akhir")]}
          />
        </Sidebar>

        {/* Header */}
        <div className="bg-white border-b-[1px] w-full">
          <div className="p-4 ms-[275px]">
            <div className="flex items-center gap-2 text-gray-600 font-semibold dark:text-white-dark">
              <LuLayoutGrid size={20} />
              <p>Dashboard</p>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="p-4 pt-5 ms-[275px]">
          {isAlertVisible && (
            <div className="flex items-center p-3.5 rounded text-success bg-success-light justify-between mb-3">
              <span className="p-1 text-base">
                Hai, anda berhasil login sebagai
                <strong className=""> {role} !</strong>
              </span>
              <button
                type="button"
                className=" hover:opacity-80"
                onClick={hideAlert}
              >
                <LuX />
              </button>
            </div>
          )}

          {/* cards Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* card kriteria */}
            <div className="flex items-center">
              <div className="w-full h-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light">
                <div className="py-6 px-6">
                  <div className="flex gap-3 items-center pb-4">
                    <div className="bg-success inline-block p-5 text-[#f1f2f3] rounded-full">
                      <div className="text-[24px] lg:text-[32px] ">
                        <LuFolder />
                      </div>
                    </div>
                    <p className="text-[#3b3f5c] text-2xl lg:text-3xl ps-2">
                      7
                    </p>
                    <p className="text-[#3b3f5c] text-2xl lg:text-3xl">
                      Kriteria
                    </p>
                  </div>
                  <p className="text-[#3b3f5c] text-sm lg:text-base">
                    Jumlah kriteria yang dipakai untuk dijadikan penilaian pada
                    sistem SPK santri terbaik pada SMA Bina Insan Mandiri Bogor
                  </p>
                </div>
              </div>
            </div>

            {/* card santri */}
            <div className="flex items-center">
              <div className="w-full h-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light">
                <div className="py-6 px-6">
                  <div className="flex gap-3 items-center pb-4">
                    <div className="bg-success inline-block p-5 text-[#f1f2f3] rounded-full">
                      <div className="text-[24px] lg:text-[32px] ">
                        <LuUsers />
                      </div>
                    </div>
                    <p className="text-[#3b3f5c] text-2xl lg:text-3xl ps-2">
                      30
                    </p>
                    <p className="text-[#3b3f5c] text-2xl lg:text-3xl">
                      Santri
                    </p>
                  </div>
                  <p className="text-[#3b3f5c] text-sm lg:text-base">
                    Jumlah santri (Alternatif) yang akan dilakukan penilaian
                    pada sistem SPK Santri terbaik pada SMA Bina Insan Mandiri
                    Bogor
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 h-full">
            {/* card */}
            {roleAdmin || roleManagerial ? (
              <div className="flex items-center hover:translate-y-[-3px] transition-all">
                <div
                  className="w-full h-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded dark:shadow-none border-b-4 border-success cursor-pointer"
                  onClick={() => [navigate("/admin/data-kriteria")]}
                >
                  <div className="p-4 py-6">
                    <div className="flex justify-between items-center ">
                      <p>Data Kriteria</p>
                      <LuFolder size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* card */}
            {roleAdmin || roleManagerial ? (
              <div className="flex items-center hover:translate-y-[-3px] transition-all">
                <div
                  className="w-full h-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded dark:shadow-none border-b-4 border-success cursor-pointer"
                  onClick={() => [navigate("/admin/data-sub-kriteria")]}
                >
                  <div className="p-4 py-6">
                    <div className="flex justify-between items-center ">
                      <p>Data Sub Kriteria</p>
                      <LuFolderTree size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* card */}
            {roleAdmin || roleManagerial ? (
            <div className="flex items-center hover:translate-y-[-3px] transition-all">
              <div
                className="w-full h-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded dark:shadow-none border-b-4 border-success cursor-pointer"
                onClick={() => [navigate("/admin/data-alternatif")]}
              >
                <div className="p-4 py-6">
                  <div className="flex justify-between items-center ">
                    <p>Data Alternatif</p>
                    <LuUsers size={20} />
                  </div>
                </div>
              </div>
            </div>
            ) : null}

            {/* card */}
            {roleAdmin || roleUstadz ? (
              <div className="flex items-center hover:translate-y-[-3px] transition-all">
                <div
                  className="w-full h-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded dark:shadow-none border-b-4 border-success cursor-pointer"
                  onClick={() => [navigate("/admin/data-penilaian")]}
                >
                  <div className="p-4 py-6">
                    <div className="flex justify-between items-center ">
                      <p>Data Penilaian</p>
                      <LuFileEdit size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}  

            {/* card */}
            {roleAdmin || roleUstadz ? (
              <div className="flex items-center hover:translate-y-[-3px] transition-all">
                <div
                  className="w-full h-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded dark:shadow-none border-b-4 border-success cursor-pointer"
                  onClick={() => [navigate("/admin/data-perhitungan")]}
                >
                  <div className="p-4 py-6">
                    <div className="flex justify-between items-center ">
                      <p>Data Perhitungan</p>
                      <LuCalculator size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* card */}
            <div className="flex items-center hover:translate-y-[-3px] transition-all">
              <div
                className="w-full h-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded dark:shadow-none border-b-4 border-success cursor-pointer"
                onClick={() => [navigate("/admin/data-hasil-akhir")]}
              >
                <div className="p-4 py-6">
                  <div className="flex justify-between items-center ">
                    <p>Data Hasil Akhir</p>
                    <LuFileBarChart size={20} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export { Dashboard };
