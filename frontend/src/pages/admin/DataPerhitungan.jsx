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
  LuArrowLeft,
  LuArrowRight,
} from "react-icons/lu";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";

const DataTabelStandarisasi = [
  { Alternatif: "A1", C1: 1, C2: 2, C3: 3, C4: 1, C5: 2, C6: 3, C7: 1 },
  { Alternatif: "A2", C1: 2, C2: 1, C3: 2, C4: 3, C5: 1, C6: 2, C7: 3 },
  { Alternatif: "A3", C1: 3, C2: 3, C3: 1, C4: 2, C5: 3, C6: 1, C7: 2 },
  { Alternatif: "A4", C1: 1, C2: 3, C3: 2, C4: 1, C5: 3, C6: 2, C7: 1 },
  { Alternatif: "A5", C1: 2, C2: 2, C3: 3, C4: 3, C5: 1, C6: 1, C7: 3 },
  { Alternatif: "A6", C1: 3, C2: 1, C3: 1, C4: 2, C5: 2, C6: 3, C7: 1 },
  { Alternatif: "A7", C1: 1, C2: 3, C3: 3, C4: 1, C5: 2, C6: 1, C7: 2 },
  { Alternatif: "A8", C1: 2, C2: 2, C3: 2, C4: 3, C5: 3, C6: 2, C7: 3 },
  { Alternatif: "A9", C1: 3, C2: 1, C3: 1, C4: 2, C5: 1, C6: 3, C7: 1 },
  { Alternatif: "A10", C1: 1, C2: 3, C3: 2, C4: 3, C5: 2, C6: 1, C7: 2 },
];

const DataTabelNormalisasi = [
  {
    Alternatif: "A1",
    C1: 0.333,
    C2: 0.667,
    C3: 1,
    C4: 0.333,
    C5: 0.667,
    C6: 1,
    C7: 0.333,
  },
  {
    Alternatif: "A2",
    C1: 0.667,
    C2: 0.333,
    C3: 0.667,
    C4: 1,
    C5: 0.333,
    C6: 0.667,
    C7: 1,
  },
  {
    Alternatif: "A3",
    C1: 1,
    C2: 1,
    C3: 0.333,
    C4: 0.667,
    C5: 1,
    C6: 0.333,
    C7: 0.667,
  },
  {
    Alternatif: "A4",
    C1: 0.333,
    C2: 1,
    C3: 0.667,
    C4: 0.333,
    C5: 1,
    C6: 0.667,
    C7: 0.333,
  },
  {
    Alternatif: "A5",
    C1: 0.667,
    C2: 0.667,
    C3: 1,
    C4: 1,
    C5: 0.333,
    C6: 0.333,
    C7: 1,
  },
  {
    Alternatif: "A6",
    C1: 1,
    C2: 0.333,
    C3: 0.333,
    C4: 0.667,
    C5: 0.667,
    C6: 1,
    C7: 0.333,
  },
  {
    Alternatif: "A7",
    C1: 0.333,
    C2: 1,
    C3: 1,
    C4: 0.333,
    C5: 0.667,
    C6: 0.333,
    C7: 0.667,
  },
  {
    Alternatif: "A8",
    C1: 0.667,
    C2: 0.667,
    C3: 0.667,
    C4: 1,
    C5: 1,
    C6: 0.667,
    C7: 1,
  },
  {
    Alternatif: "A9",
    C1: 1,
    C2: 0.333,
    C3: 0.333,
    C4: 0.667,
    C5: 0.333,
    C6: 1,
    C7: 0.333,
  },
  {
    Alternatif: "A10",
    C1: 0.333,
    C2: 1,
    C3: 0.667,
    C4: 1,
    C5: 0.667,
    C6: 0.333,
    C7: 0.667,
  },
];

const bobotTabel = [
  { C1: 0.2, C2: 0.15, C3: 0.15, C4: 0.1, C5: 0.15, C6: 0.15, C7: 0.1 },
];

const hasilQi = [
  { no: 1, alternatif: "A1", nilaiQi: "0.539" },
  { no: 2, alternatif: "A2", nilaiQi: "0.515" },
  { no: 3, alternatif: "A3", nilaiQi: "0.547" },
  { no: 4, alternatif: "A4", nilaiQi: "0.496" },
  { no: 5, alternatif: "A5", nilaiQi: "0.537" },
  { no: 6, alternatif: "A6", nilaiQi: "0.522" },
  { no: 7, alternatif: "A7", nilaiQi: "0.494" },
  { no: 8, alternatif: "A8", nilaiQi: "0.547" },
  { no: 9, alternatif: "A9", nilaiQi: "0.520" },
  { no: 10, alternatif: "A10", nilaiQi: "0.528" },
];

const DataPerhitungan = () => {
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

  const [currentPageStandarisasi, setCurrentPageStandarisasi] = useState(1);
  const [currentPageNormalisasi, setCurrentPageNormalisasi] = useState(1);
  const [currentPagePerhitungan, setCurrentPagePerhitungan] = useState(1);
  const itemsPerPage = 5;

  // Calculate current items for standarisasi table
  const indexOfLastItemStandarisasi = currentPageStandarisasi * itemsPerPage;
  const indexOfFirstItemStandarisasi =
    indexOfLastItemStandarisasi - itemsPerPage;
  const currentItemsStandarisasi = DataTabelStandarisasi.slice(
    indexOfFirstItemStandarisasi,
    indexOfLastItemStandarisasi
  );

  // Calculate total pages for standarisasi table
  const totalPagesStandarisasi = Math.ceil(
    DataTabelStandarisasi.length / itemsPerPage
  );

  // Calculate current items for normalisasi table
  const indexOfLastItemNormalisasi = currentPageNormalisasi * itemsPerPage;
  const indexOfFirstItemNormalisasi = indexOfLastItemNormalisasi - itemsPerPage;
  const currentItemsNormalisasi = DataTabelNormalisasi.slice(
    indexOfFirstItemNormalisasi,
    indexOfLastItemNormalisasi
  );

  // Calculate total pages for normalisasi table
  const totalPagesNormalisasi = Math.ceil(
    DataTabelNormalisasi.length / itemsPerPage
  );

  // Calculate current items for hasil perhitungan table
  const indexOfLastItemPerhitungan = currentPagePerhitungan * itemsPerPage;
  const indexOfFirstItemPerhitungan = indexOfLastItemPerhitungan - itemsPerPage;
  const currentItemsPerhitungan = hasilQi.slice(
    indexOfFirstItemPerhitungan,
    indexOfLastItemPerhitungan
  );

  // Calculate total pages for hasil perhitungan table
  const totalPagesPerhitungan = Math.ceil(hasilQi.length / itemsPerPage);

  // Handlers for page change
  const nextStandarisasi = () => {
    if (currentPageStandarisasi === totalPagesStandarisasi) return;
    setCurrentPageStandarisasi(currentPageStandarisasi + 1);
  };

  const prevStandarisasi = () => {
    if (currentPageStandarisasi === 1) return;
    setCurrentPageStandarisasi(currentPageStandarisasi - 1);
  };

  const nextNormalisasi = () => {
    if (currentPageNormalisasi === totalPagesNormalisasi) return;
    setCurrentPageNormalisasi(currentPageNormalisasi + 1);
  };

  const prevNormalisasi = () => {
    if (currentPageNormalisasi === 1) return;
    setCurrentPageNormalisasi(currentPageNormalisasi - 1);
  };

  const nextPerhitungan = () => {
    if (currentPagePerhitungan === totalPagesPerhitungan) return;
    setCurrentPagePerhitungan(currentPagePerhitungan + 1);
  };

  const prevPerhitungan = () => {
    if (currentPagePerhitungan === 1) return;
    setCurrentPagePerhitungan(currentPagePerhitungan - 1);
  };
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
              onClick={() => [navigate("/admin/data-penilaian")]}
            />
          ) : null}
          {roleAdmin || roleUstadz ? (
            <SidebarItem
              icon={<LuCalculator size={20} />}
              text="Data Perhitungan"
              active
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
              <LuCalculator size={20} />
              <p>Data Perhitungan</p>
            </div>
          </div>
        </div>

        {/* konten */}
        <div className="p-4 pt-5 ms-[275px]">
          {/* Tabel Standarisasi */}
          <div className="bg-white rounded-md w-full p-3 border mt-4">
            <div>Tabel Standarisasi</div>
            <div className="table-responsive mb-5 mt-5">
              <table className="table-hover">
                <thead>
                  <tr>
                    <th>Alternatif</th>
                    <th>C1</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C4</th>
                    <th>C5</th>
                    <th>C6</th>
                    <th>C7</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemsStandarisasi.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>{row.Alternatif}</td>
                      <td>{row.C1}</td>
                      <td>{row.C2}</td>
                      <td>{row.C3}</td>
                      <td>{row.C4}</td>
                      <td>{row.C5}</td>
                      <td>{row.C6}</td>
                      <td>{row.C7}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end items-center gap-8">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={prevStandarisasi}
                disabled={currentPageStandarisasi === 1}
              >
                <LuArrowLeft strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-normal">
                Page{" "}
                <strong className="text-gray-900">
                  {currentPageStandarisasi}
                </strong>{" "}
                of{" "}
                <strong className="text-gray-900">
                  {totalPagesStandarisasi}
                </strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                onClick={nextStandarisasi}
                disabled={currentPageStandarisasi === totalPagesStandarisasi}
              >
                <LuArrowRight strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </div>
          </div>

          {/* Tabel Normalisasi */}
          <div className="bg-white rounded-md w-full p-3 border mt-4">
            <div>Matriks normalisasi</div>
            <div className="table-responsive mb-5 mt-5">
              <table className="table-hover">
                <thead>
                  <tr>
                    <th>Alternatif</th>
                    <th>C1</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C4</th>
                    <th>C5</th>
                    <th>C6</th>
                    <th>C7</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemsNormalisasi.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>{row.Alternatif}</td>
                      <td>{row.C1}</td>
                      <td>{row.C2}</td>
                      <td>{row.C3}</td>
                      <td>{row.C4}</td>
                      <td>{row.C5}</td>
                      <td>{row.C6}</td>
                      <td>{row.C7}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end items-center gap-8">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={prevNormalisasi}
                disabled={currentPageNormalisasi === 1}
              >
                <LuArrowLeft strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-normal">
                Page{" "}
                <strong className="text-gray-900">
                  {currentPageNormalisasi}
                </strong>{" "}
                of{" "}
                <strong className="text-gray-900">
                  {totalPagesNormalisasi}
                </strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                onClick={nextNormalisasi}
                disabled={currentPageNormalisasi === totalPagesNormalisasi}
              >
                <LuArrowRight strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </div>
          </div>

          {/* Tabel Bobot */}
          <div className="bg-white rounded-md w-full p-3 border mt-4">
            <div>Bobot Kriteria</div>
            <div className="table-responsive mb-5 mt-5">
              <table className="table-hover">
                <thead>
                  <tr>
                    <th>C1</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C4</th>
                    <th>C5</th>
                    <th>C6</th>
                    <th>C7</th>
                  </tr>
                </thead>
                <tbody>
                  {bobotTabel.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>{row.C1}</td>
                      <td>{row.C2}</td>
                      <td>{row.C3}</td>
                      <td>{row.C4}</td>
                      <td>{row.C5}</td>
                      <td>{row.C6}</td>
                      <td>{row.C7}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabel Hasil Perhitungan */}
          <div className="bg-white rounded-md w-full p-3 border mt-4">
            <div>Hasil Perhitungan</div>
            <div className="table-responsive max-w-[500px] mb-5 mt-5">
              <table className="table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Alternatif</th>
                    <th>Nilai Qi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemsPerhitungan.map((row) => (
                    <tr key={row.no} className="text-center">
                      <td>{row.no}</td>
                      <td>{row.alternatif}</td>
                      <td>{row.nilaiQi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-8">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={prevPerhitungan}
                disabled={currentPagePerhitungan === 1}
              >
                <LuArrowLeft strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-normal">
                Page{" "}
                <strong className="text-gray-900">
                  {currentPagePerhitungan}
                </strong>{" "}
                of{" "}
                <strong className="text-gray-900">
                  {totalPagesPerhitungan}
                </strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                onClick={nextPerhitungan}
                disabled={currentPagePerhitungan === totalPagesPerhitungan}
              >
                <LuArrowRight strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { DataPerhitungan };
