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
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DataKriteria = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [curBobot, setCurBobot] = useState(0);
  const [kriteriaId, setKriteriaId] = useState("");
  const [currentName, setCurrentName] = useState("");

  const [nameError, setNameError] = useState("");
  const [bobotError, setBobotError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [roleAdmin, setRoleAdmin] = useState(false);
  const [roleUstadz, setRoleUstadz] = useState(false);
  const [roleManagerial, setRoleManagerial] = useState(false);

  const [kriterias, setKriterias] = useState([]);

  useEffect(() => {
    if (role === "Admin") {
      setRoleAdmin(true);
    } else if (role === "Ustadz") {
      setRoleUstadz(true);
    } else if (role === "Managerial") {
      setRoleManagerial(true);
    }
  }, []);

  const mySwal = withReactContent(Swal);

  // GET Kriteria
  const fetchKriteria = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/kriteria`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setKriterias(data.data);
    } catch (error) {
      setError(error);
    }
  };

  // CREATE Kriteria
  const handleAdd = async (e) => {
    e.preventDefault();
    setNameError("");
    setBobotError("");
    setTypeError("");

    let isValid = true;
    if (!curBobot) {
      setBobotError("Masukan Bobot");
      isValid = false;
    }
    if (!name) {
      setNameError("Masukan Nama");
      isValid = false;
    }
    if (!type) {
      setTypeError("Masukan Type");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    const bobot = curBobot ? parseFloat(curBobot) : 0;

    console.log(bobot, typeof bobot);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/kriteria`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bobot, type, name }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        console.log("Kriteria Berhasil Di buat:", data);
        fetchKriteria();
        setName("");
        setType("");
        setCurBobot(0);
      } else {
        console.error("Error tambah Kriteria:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    handleOpenAdd();

    mySwal.fire({
      title: "Berhasil",
      text: "Kriteria Berhasil ditambahkan",
      icon: "success",
      confirmButtonColor: "#00ab55",
    });
  };

  // UPDATE Kriteria
  const handleUpdate = async (id) => {
    setNameError("");
    setBobotError("");
    setTypeError("");

    let isValid = true;
    if (!curBobot) {
      setBobotError("Masukan Bobot");
      isValid = false;
    }
    if (!name) {
      setNameError("Masukan Nama");
      isValid = false;
    }
    if (!type) {
      setTypeError("Masukan Type");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    const bobot = curBobot ? parseFloat(curBobot) : 0;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/kriteria/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bobot, type, name }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        console.log("Kriteria Berhasil Di Update:", data);
        fetchKriteria();
        setName("");
        setType("");
        setCurBobot(0);
      } else {
        console.error("Error update Kriteria:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    handleOpenUpdate();

    mySwal.fire({
      title: "Berhasil",
      text: "Kriteria Berhasil di Update",
      icon: "success",
      confirmButtonColor: "#00ab55",
    });
  };

  // DELETE Kriteria
  const handleDelete = async (id, name) => {
    Swal.fire({
      html: `Apakah yakin akan menghapus <strong>${name}</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/kriteria/${id}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            console.log("Kriteria berhasil dihapus");
            fetchKriteria();
          } else {
            const data = await response.json();
            console.error("Error hapus kriteria:", data.message);
          }
        } catch (error) {
          console.error("Network error:", error);
        }
        Swal.fire({
          title: "Dihapus",
          text: `${name} berhasil dihapus`,
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    fetchKriteria();
  }, []);

  // dialog tambah
  const handleOpenAdd = () => {
    setNameError("");
    setBobotError("");
    setTypeError("");
    setOpenAdd((cur) => !cur);
  };

  const handleOpenUpdate = (id, name, bobot, type) => {
    setNameError("");
    setBobotError("");
    setTypeError("");
    setName(name);
    setCurBobot(bobot);
    setType(type);
    setKriteriaId(id);
    setCurrentName(name);
    setOpenUpdate((cur) => !cur);
  };

  return (
    <>
      <Dialog
        size="xs"
        open={openAdd}
        handler={handleOpenAdd}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-success">
              Tambah Kriteria
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Nama
            </Typography>
            <Input
              label="Masukan Nama"
              size="lg"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(nameError)}
            />
            {nameError && (
              <p className="text-xs text-right text-danger flex items-center justify-between">
                * {nameError}
              </p>
            )}
            <Typography className="-mb-2" variant="h6">
              Type
            </Typography>
            <Select
              label="Pilih Type"
              value={type}
              onChange={(e) => setType(e)}
              error={Boolean(typeError)}
            >
              <Option value="cost">Cost</Option>
              <Option value="benefit">Benefit</Option>
            </Select>
            {typeError && (
              <p className="text-xs text-right text-danger flex items-center justify-between">
                * {typeError}
              </p>
            )}
            <Typography className="-mb-2" variant="h6">
              Bobot
            </Typography>
            <Input
              label="Masukan Bobot"
              size="lg"
              value={curBobot}
              onChange={(e) => setCurBobot(e.target.value)}
              error={Boolean(bobotError)}
            />
            {bobotError && (
              <p className="text-xs text-right text-danger flex items-center justify-between">
                * {bobotError}
              </p>
            )}
          </CardBody>
          <CardFooter className="pt-0 flex justify-between gap-6">
            <Button className="bg-success w-full" onClick={handleAdd}>
              Tambah
            </Button>
            <Button className="bg-gray-400 w-full" onClick={handleOpenAdd}>
              Batal
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      <Dialog
        size="xs"
        open={openUpdate}
        handler={setOpenUpdate}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-success">
              Edit {currentName}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Nama
            </Typography>
            <Input
              label="Masukan Nama"
              size="lg"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Type
            </Typography>
            <Select
              label="Pilih Type"
              value={type}
              onChange={(e) => setType(e)}
            >
              <Option value="cost">Cost</Option>
              <Option value="benefit">Benefit</Option>
            </Select>
            <Typography className="-mb-2" variant="h6">
              Bobot
            </Typography>
            <Input
              label="Masukan Bobot"
              size="lg"
              value={curBobot}
              onChange={(e) => setCurBobot(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0 flex justify-between gap-6">
            <Button
              className="bg-success w-full"
              onClick={() => handleUpdate(kriteriaId)}
            >
              Edit
            </Button>
            <Button className="bg-gray-400 w-full" onClick={handleOpenUpdate}>
              Batal
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
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
              active
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
              <LuFolder size={20} />
              <p>Data Kriteria</p>
            </div>
          </div>
        </div>

        <div className="p-4 pt-5 ms-[275px]">
          <button
            type="button"
            className="btn bg-success border-none text-white items-center gap-2 hover:bg-[#208e57]"
            onClick={handleOpenAdd}
          >
            <span>Tambah</span>
            <LuPlus />
          </button>

          {/* Tabel */}
          <div className="w-full flex flex-col mt-3 bg-white shadow-md rounded-md">
            {/* <div className="border p-2 rounded-t-md ps-5 text-xl">
              <span>Tabel Kriteria</span>
            </div> */}
            <div className="p-5 border rounded-md">
              <div className="table-responsive mb-5">
                <table className="table-hover">
                  <thead>
                    <tr>
                      <th>Kode</th>
                      <th>Kriteria</th>
                      <th>Bobot</th>
                      <th>Type</th>
                      <th>Normalisasi Bobot</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kriterias.map((data) => {
                      return (
                        <tr key={data._id}>
                          <td>
                            <div className="whitespace-nowrap">
                              C{data.kode}
                            </div>
                          </td>
                          <td className="text-center">{data.name}</td>
                          <td className="text-center">{data.bobot}</td>
                          <td className="text-center">{data.type}</td>
                          <td className="text-center">
                            {data.normalizedBobot.toFixed(2)}
                          </td>
                          <td className="text-center space-x-3">
                            <Tippy content="Edit">
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenUpdate(
                                    data._id,
                                    data.name,
                                    data.bobot,
                                    data.type
                                  )
                                }
                              >
                                <LuFileEdit className="text-success" />
                              </button>
                            </Tippy>
                            <Tippy content="Delete">
                              <button
                                type="button"
                                onClick={() => handleDelete(data._id, data.name)}
                              >
                                <LuTrash2 className="text-danger" />
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

export { DataKriteria };
