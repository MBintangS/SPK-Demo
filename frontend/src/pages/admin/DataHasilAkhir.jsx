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
  LuDownload,
} from "react-icons/lu";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import xlsx from "json-as-xlsx"

const DataHasilAkhir = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [roleAdmin, setRoleAdmin] = useState(false);
  const [roleUstadz, setRoleUstadz] = useState(false);
  const [roleManagerial, setRoleManagerial] = useState(false);

  const [hasilPreferensiQi, setHasilPreferensiQi] = useState([]);
  const [hasilAkhirDownload, setHasilAkhirDownload] = useState([]);


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

    //GET HASIL PREFERENSI Qi
    const fethHasilPreferensiQi = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/penilaian/hasil-akhir`,
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

    const fetchHasilDownload = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/penilaian/hasil-akhir-download`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setHasilAkhirDownload(data.data);
      } catch (error) {
        setError(error);
      }
    }

    useEffect(() => {
      fethHasilPreferensiQi()
      fetchHasilDownload()
    },[])

  const { columns: columnsPreferensiQi, rows: rowsPreferensiQi } =
  hasilPreferensiQi;

  const handleDownload = () => {
    if (hasilAkhirDownload) {
      let settings = {
        fileName: "HASIL-SPK-SANTRI"
      }
      xlsx([hasilAkhirDownload], settings)
    }
  }

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
              onClick={() => [navigate("/admin/data-perhitungan")]}
            />
          ) : null}
          <SidebarItem
            icon={<LuFileBarChart size={20} />}
            text="Data Hasil Akhir"
            active
            onClick={() => [navigate("/admin/data-hasil-akhir")]}
          />
        </Sidebar>

        {/* Header */}
        <div className="bg-white border-b-[1px] w-full">
          <div className="p-4 ms-[275px]">
            <div className="flex items-center gap-2 text-gray-600 font-semibold dark:text-white-dark">
              <LuFileBarChart size={20} />
              <p>Data Hasil Akhir</p>
            </div>
          </div>
        </div>

        <div className="p-4 pt-5 ms-[275px]">
          {/* Tabel Hasil Perhitungan */}
          <div className="bg-white rounded-md w-full p-3 border mt-4">
            <div>Hasil Perhitungan</div>
            <div className="p-2 rounded-t-md justify-end flex pr-5 ps-5 text-xl">
            <Tippy content="Download to XLXs">
              <button
                type="button"
                className="btn bg-success border-none text-white items-center gap-2"
                onClick={handleDownload}
              >
                Download
                <LuDownload />
              </button>
            </Tippy>
          </div>
            <div className="table-responsive mb-5 mt-5">
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
                  {rowsPreferensiQi?.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="even:bg-blue-gray-50/50"
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
          </div>
        </div>
      </div>
    </>
  );
};

export { DataHasilAkhir };
