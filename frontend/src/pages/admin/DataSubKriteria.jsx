import { LuFolder, LuLayoutGrid, LuFolderTree, LuUser, LuUsers, LuFileEdit, LuCalculator, LuFileBarChart, LuUserCog } from "react-icons/lu";
import Sidebar, { SidebarItem } from "../../components/Sidebar"
import {useNavigate} from "react-router-dom"

const DataSubKriteria = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<LuLayoutGrid size={20} />}
            text="Dashboard"
            onClick={() => [navigate("/admin/dashboard")]}
          />
          <hr className="my-3" />
          <SidebarItem
            icon={<LuFolder size={20} />}
            text="Data Kriteria"
            onClick={() => [navigate("/admin/data-kriteria")]}
          />
          <SidebarItem
            icon={<LuFolderTree size={20} />}
            text="Data Sub Kriteria"
            active
            onClick={() => [navigate("/admin/data-sub-kriteria")]}
          />
          <SidebarItem
            icon={<LuUsers size={20} />}
            text="Data Alternatif"
            onClick={() => [navigate("/admin/data-alternatif")]}
          />
          <SidebarItem
            icon={<LuFileEdit size={20} />}
            text="Data Penilaian"
            onClick={() => [navigate("/admin/data-penilaian")]}
          />
          <SidebarItem
            icon={<LuCalculator size={20} />}
            text="Data Perhitungan"
            onClick={() => [navigate("/admin/data-perhitungan")]}
          />
          <SidebarItem
            icon={<LuFileBarChart size={20} />}
            text="Data Hasil Akhir"
            onClick={() => [navigate("/admin/data-hasil-akhir")]}
          />
        <hr className="my-3" />
          <SidebarItem icon={<LuUserCog size={20} />} text="Kelola Admin" onClick={() => [navigate("/admin/kelola-admin")]} /> 
        </Sidebar>
        <div className="p-4 ms-[275px]">HALAMAN DATA SUB KRITERIA</div>
      </div>
    </>
  );
};

export { DataSubKriteria };
