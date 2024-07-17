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


const bobotTabel = [
  { C1: 0.2, C2: 0.15, C3: 0.15, C4: 0.1, C5: 0.15, C6: 0.15, C7: 0.1 },
];


const DataPerhitungan = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [roleAdmin, setRoleAdmin] = useState(false);
  const [roleUstadz, setRoleUstadz] = useState(false);
  const [roleManagerial, setRoleManagerial] = useState(false);

  const [hasilPenilaian, setHasilPenilaian] = useState([]);
  const [hasilNormalisasi, setHasilNormalisasi] = useState([]);
  const [hasilPreferensiQi, setHasilPreferensiQi] = useState([]);
  const [error, setError] = useState("");

  //GET HASIL PENILAIAN / STANDARISASI
  const fetchHasilPenilaian = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/penilaian/hasil`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setHasilPenilaian(data.data);
    } catch (error) {
      setError(error);
    }
  };

  //GET HASIL NORMALISASI
  const fetchHasilNormalisasi = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/penilaian/hasil-normalisasi`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setHasilNormalisasi(data.data);
    } catch (error) {
      setError(error);
    }
  };

  //GET HASIL PREFERENSI Qi
  const fethHasilPreferensiQi = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/penilaian/hasil-preferensi-qi`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setHasilPreferensiQi(data.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchHasilPenilaian();
    fetchHasilNormalisasi();
    fethHasilPreferensiQi();
  }, []);

  // console.log(hasilPenilaian);
  // console.log(hasilNormalisasi);
  console.log(hasilPreferensiQi);

  const { columns: columnsPenilaian, rows: rowsPenilaian } = hasilPenilaian;
  const { columns: columnsNormalisasi, rows: rowsNormalisasi } =
    hasilNormalisasi;
  const { columns: columnsPreferensiQi, rows: rowsPreferensiQi } =
    hasilPreferensiQi;

  // console.log("rows :", rowsPenilaian);
  // console.log("cols :", columnsPenilaian);

  useEffect(() => {
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

  const curRowsPenilaian = rowsPenilaian?.slice(
    indexOfFirstItemStandarisasi,
    indexOfLastItemStandarisasi
  );

  // Calculate total pages for standarisasi table
  const totalPagesStandarisasi = Math.ceil(
    rowsPenilaian?.length / itemsPerPage
  );

  // Calculate current items for normalisasi table
  const indexOfLastItemNormalisasi = currentPageNormalisasi * itemsPerPage;
  const indexOfFirstItemNormalisasi = indexOfLastItemNormalisasi - itemsPerPage;

  const curRowsNormalisasi = rowsNormalisasi?.slice(
    indexOfFirstItemNormalisasi,
    indexOfLastItemNormalisasi
  );

  // Calculate total pages for normalisasi table
  const totalPagesNormalisasi = Math.ceil(
    rowsNormalisasi?.length / itemsPerPage
  );

  // Calculate current items for hasil perhitungan table
  const indexOfLastItemPerhitungan = currentPagePerhitungan * itemsPerPage;
  const indexOfFirstItemPerhitungan = indexOfLastItemPerhitungan - itemsPerPage;

  const curRowsPreferensiQi = rowsPreferensiQi?.slice(
    indexOfFirstItemPerhitungan,
    indexOfLastItemPerhitungan
  );

  // Calculate total pages for hasil perhitungan table
  const totalPagesPerhitungan = Math.ceil(
    rowsPreferensiQi?.length / itemsPerPage
  );

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
                <tr>
                  {columnsPenilaian?.map((column, index) => (
                    <th
                      key={column}
                      className={`border-b border-blue-gray-100 bg-success p-4 ${
                        index === 0 ? "rounded-tl-lg" : ""
                      } ${
                        index === columnsPenilaian.length - 1
                          ? "rounded-tr-lg"
                          : ""
                      }`}
                    >
                      <Typography
                        variant="h6"
                        className="text-white font-medium leading-none"
                      >
                        {column}
                      </Typography>
                    </th>
                  ))}
                </tr>
                <tbody>
                  {curRowsPenilaian?.map((row, index) => (
                    <tr
                      key={index}
                      className="even:bg-blue-gray-50/50 text-center"
                    >
                      {columnsPenilaian.map((column) => (
                        <td key={column}>
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-normal text-center"
                          >
                            {row[column]}
                          </Typography>
                        </td>
                      ))}
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
                    {columnsNormalisasi?.map((column, index) => (
                      <th
                        key={column}
                        className={`border-b border-blue-gray-100 bg-success p-4 ${
                          index === 0 ? "rounded-tl-lg" : ""
                        } ${
                          index === columnsNormalisasi.length - 1
                            ? "rounded-tr-lg"
                            : ""
                        }`}
                      >
                        <Typography
                          variant="h6"
                          className="text-white font-medium leading-none"
                        >
                          {column}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {curRowsNormalisasi?.map((row, index) => (
                    <tr
                      key={index}
                      className="even:bg-blue-gray-50/50 text-center"
                    >
                      {columnsNormalisasi.map((column) => (
                        <td key={column}>
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-normal text-center"
                          >
                            {row[column]}
                          </Typography>
                        </td>
                      ))}
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
              <table className="table-hover w-full">
                <thead>
                  <tr>
                    {columnsPreferensiQi?.map((column, index) => (
                      <th
                        key={column}
                        className={`border-b border-blue-gray-100 bg-success p-4 ${
                          index === 0 ? "rounded-tl-lg" : ""
                        } ${
                          index === columnsPreferensiQi.length - 1
                            ? "rounded-tr-lg"
                            : ""
                        }`}
                      >
                        <Typography
                          variant="h6"
                          className="text-white font-medium leading-none"
                        >
                          {column}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {curRowsPreferensiQi?.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="even:bg-blue-gray-50/50 text-center"
                    >
                      {columnsPreferensiQi.map((column, colIndex) => (
                        <td key={colIndex} className="p-4">
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-normal text-center"
                          >
                            {row[column]}
                          </Typography>
                        </td>
                      ))}
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
