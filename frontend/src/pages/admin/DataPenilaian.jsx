import {
  LuFolder,
  LuLayoutGrid,
  LuFolderTree,
  LuUsers,
  LuFileEdit,
  LuCalculator,
  LuFileBarChart,
} from "react-icons/lu";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const tableData = [
  {
    id: 1,
    nama_alternatif: "Daiva",
  },
  {
    id: 2,
    nama_alternatif: "Akmal",
  },
  {
    id: 3,
    nama_alternatif: "Budi",
  },
  {
    id: 4,
    nama_alternatif: "Farhan",
  },
  {
    id: 5,
    nama_alternatif: "Fauzi",
  },
];

const DataPenilaian = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [roleAdmin, setRoleAdmin] = useState(false);
  const [roleUstadz, setRoleUstadz] = useState(false);
  const [roleManagerial, setRoleManagerial] = useState(false);

  useEffect(() => {
    // console.log("anda sebagai", role);

    if (role === "Admin") {
      setRoleAdmin(true);
    } else if (role === "Ustadz") {
      setRoleUstadz(true);
    } else if (role === "Managerial") {
      setRoleManagerial(true);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <Sidebar>
          <SidebarItem
            icon={<LuLayoutGrid size={20} />}
            text="Dashboard"
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
              active
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
              <LuFileEdit size={20} />
              <p>Data Penilaian</p>
            </div>
          </div>
        </div>

        <div className="p-4 pt ms-[275px]">
          {/* Tabel */}
          <div className="w-full flex flex-col  bg-white shadow-md rounded-md">
            {/* <div className="border p-2 rounded-t-md ps-5 text-xl">
              <span>Tabel Kriteria</span>
            </div> */}
            <div className="p-5 border rounded-md">
              <div className="table-responsive mb-5">
                <table className="table-hover">
                  <thead>
                    <tr>
                      <th>Nama Santri</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data) => {
                      return (
                        <tr key={data.id}>
                          {/* <td>
                            <div className="whitespace-nowrap">{data.id}</div>
                          </td> */}
                          <td>{data.nama_alternatif}</td>
                          <td className="text-center space-x-3">
                            <Tippy content="Edit">
                              <button type="button">
                                <LuFileEdit className="text-success" />
                              </button>
                            </Tippy>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { DataPenilaian };
