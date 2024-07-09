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
  LuTrash2,
  LuPlus,
} from "react-icons/lu";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const tableData = [
  {
    id: 1,
    kode_kriteria: "C1",
    kriteria: "Absensi",
    sub_kriteria: [
      { deskripsi: "Lebih dari 90%", nilai: 3 },
      { deskripsi: "Lebih dari sama dengan 85%", nilai: 2 },
      { deskripsi: "Kurang dari 85%", nilai: 1 },
    ],
  },
  {
    id: 2,
    kode_kriteria: "C2",
    kriteria: "Nilai Mapel Dinas",
    sub_kriteria: [
      { deskripsi: "Lebih dari 90%", nilai: 3 },
      { deskripsi: "Lebih dari sama dengan 80%", nilai: 2 },
      { deskripsi: "Kurang dari 80%", nilai: 1 },
    ],
  },
  {
    id: 3,
    kode_kriteria: "C3",
    kriteria: "Nilai Mapel Pondok",
    sub_kriteria: [
      { deskripsi: "Lebih dari 90%", nilai: 3 },
      { deskripsi: "Lebih dari sama dengan 80%", nilai: 2 },
      { deskripsi: "Kurang dari 80%", nilai: 1 },
    ],
  },
  {
    id: 4,
    kode_kriteria: "C4",
    kriteria: "Sertifikat Prestasi",
    sub_kriteria: [
      { deskripsi: "Memiliki Sertifikat Lebih dari 5", nilai: 3 },
      { deskripsi: "Memiliki Sertifikat Lebih dari 3", nilai: 2 },
      { deskripsi: "Kurang dari sama dengan 3", nilai: 1 },
    ],
  },
  {
    id: 5,
    kode_kriteria: "C5",
    kriteria: "Tahfidz",
    sub_kriteria: [
      { deskripsi: "Lebih dari sama dengan 15 Juz", nilai: 3 },
      { deskripsi: "Lebih dari sama dengan 6 Juz", nilai: 2 },
      { deskripsi: "Kurang dari 6 Juz", nilai: 1 },
    ],
  },
  {
    id: 6,
    kode_kriteria: "C6",
    kriteria: "Bahasa Arab",
    sub_kriteria: [
      { deskripsi: "Mencapai Kitab Arab Baron 5-6", nilai: 3 },
      { deskripsi: "Mencapai Kitab Arab Baron 3-4", nilai: 2 },
      { deskripsi: "Mencapai Kitab Arab Baron 1-2", nilai: 1 },
    ],
  },
  {
    id: 7,
    kode_kriteria: "C7",
    kriteria: "Bussiness Plan / Produk",
    sub_kriteria: [
      { deskripsi: "Lebih dari sama dengan 3 produk", nilai: 3 },
      { deskripsi: "Memiliki 2 Produk", nilai: 2 },
      { deskripsi: "Memiliki 1 Produk", nilai: 1 },
    ],
  },
];

const DataSubKriteria = () => {
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
              active
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
              <LuFolderTree size={20} />
              <p>Data Sub Kriteria</p>
            </div>
          </div>
        </div>

        <div className="p-4 pt-2 ms-[275px]">
          {tableData.map((data) => {
            return (
              <div className="w-full flex flex-col mt-3 bg-white shadow-md rounded-md">
                <div className="border p-2 rounded-t-md ps-5 text-xl flex items-center justify-between">
                  <span>
                    {data.kriteria} ({data.kode_kriteria})
                  </span>
                  <button
                    type="button"
                    className="btn bg-success border-none text-white items-center gap-2"
                  >
                    <span>Tambah</span>
                    <LuPlus />
                  </button>
                </div>
                <div className="p-5 border rounded-b-md">
                  <div className="table-responsive mb-5">
                    <table className="table-hover">
                      <thead>
                        <tr>
                          <th>Deskripsi Sub Kriteria</th>
                          <th>Nilai</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.sub_kriteria.map((sub, index) => (
                          <tr key={index}>
                            <td>
                              <div className="whitespace-nowrap">
                                {sub.deskripsi}
                              </div>
                            </td>
                            <td>{sub.nilai}</td>
                            <td className="text-center space-x-3">
                              <Tippy content="Edit">
                                <button type="button">
                                  <LuFileEdit className="text-success" />
                                </button>
                              </Tippy>
                              <Tippy content="Delete">
                                <button type="button">
                                  <LuTrash2 className="text-danger" />
                                </button>
                              </Tippy>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { DataSubKriteria };
