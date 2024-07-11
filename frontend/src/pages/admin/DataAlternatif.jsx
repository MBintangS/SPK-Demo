import {
  LuFolder,
  LuLayoutGrid,
  LuFolderTree,
  LuUsers,
  LuFileEdit,
  LuCalculator,
  LuFileBarChart,
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
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DataAlternatif = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [roleAdmin, setRoleAdmin] = useState(false);
  const [roleUstadz, setRoleUstadz] = useState(false);
  const [roleManagerial, setRoleManagerial] = useState(false);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [nisn, setNisn] = useState("");
  const [name, setName] = useState("");
  const [serverError, setServerError] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [nisnError, setNisnError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (role === "Admin") {
      setRoleAdmin(true);
    } else if (role === "Ustadz") {
      setRoleUstadz(true);
    } else if (role === "Managerial") {
      setRoleManagerial(true);
    }
  }, [role]);

  const mySwal = withReactContent(Swal);

  //GET STUDENT
  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/students`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setStudents(data.data);
    } catch (error) {
      setError(error);
    }
  };

  // CREATE STUDENT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNisnError("");
    setNameError("");

    let isValid = true;
    if (!nisn) {
      setNisnError("Masukan NISN");
      isValid = false;
    }
    if (!name) {
      setNameError("Masukan Nama");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nisn, name }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message);
        return;
      }

      if (response.ok) {
        console.log("Santri Berhasil Di buat:", data);
        fetchStudents();
        setNisn("");
        setName("");
        handleOpenAdd();
        mySwal.fire({
          title: "Berhasil",
          text: "Santri Berhasil ditambahkan",
          icon: "success",
          confirmButtonColor: "#00ab55",
        });
      } else {
        console.error("Error buat santri:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // DELETE STUDENT
  const handleDelete = (id, name) => {
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
            `${process.env.REACT_APP_API_URL}/students/${id}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            console.log("Santri berhasil dihapus");
            fetchStudents();
          } else {
            const data = await response.json();
            console.error("Error hapus santri:", data.message);
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

  // UPDATE STUDENT
  const handleEdit = async (id) => {
    let isValid = true;
    if (!nisn) {
      setNisnError("Masukan NISN");
      isValid = false;
    }
    if (!name) {
      setNameError("Masukan Nama");
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nisn, name }),
        }
      );

      if (response.ok) {
        console.log("Santri berhasil di update");
        fetchStudents();

        handleOpenUpdate();

        mySwal.fire({
          title: "Berhasil",
          text: "Santri Berhasil di Update",
          icon: "success",
          confirmButtonColor: "#00ab55",
        });
      } else {
        const errorData = await response.json();
        console.error("Error update santri:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // dialog tambah
  const handleOpenAdd = () => {
    setNisn("");
    setName("");
    setNisnError("");
    setNameError("");
    setServerError("");
    setOpenAdd((cur) => !cur);
  };

  // dialog edit
  const handleOpenUpdate = (id, nisn, name) => {
    setNisnError("");
    setNameError("");
    setStudentId(id);
    setNisn(nisn);
    setName(name);
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
              Tambah Santri
            </Typography>
            <Typography className="-mb-2" variant="h6">
              NISN
            </Typography>
            <Input
              label="masukan nisn"
              size="lg"
              type="text"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              error={Boolean(nisnError)}
            />
            {nisnError && (
              <p className="text-xs text-right text-danger flex items-center justify-between">
                * {nisnError}
              </p>
            )}
            <Typography className="-mb-2" variant="h6">
              Nama
            </Typography>
            <Input
              label="masukan nama"
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
            {serverError && (
              <p className="error text-xs text-danger">{serverError}</p>
            )}
          </CardBody>
          <CardFooter className="pt-0 flex justify-between gap-6">
            <Button className="bg-success w-full" onClick={handleSubmit}>
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
              NISN
            </Typography>
            <Input
              label="Masukan NISN"
              size="lg"
              type="text"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              error={Boolean(nisnError)}
            />
            {nisnError && (
              <p className="text-xs right-0 text-danger flex items-center justify-between">
                * {nisnError}
              </p>
            )}

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
          </CardBody>
          <CardFooter className="pt-0 flex justify-between gap-6">
            <Button
              className="bg-success w-full"
              onClick={() => handleEdit(studentId)}
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
            <>
              <SidebarItem
                icon={<LuFolder size={20} />}
                text="Data Kriteria"
                onClick={() => [navigate("/admin/data-kriteria")]}
              />
              <SidebarItem
                icon={<LuFolderTree size={20} />}
                text="Data Sub Kriteria"
                onClick={() => [navigate("/admin/data-sub-kriteria")]}
              />
              <SidebarItem
                icon={<LuUsers size={20} />}
                text="Data Alternatif"
                active
                onClick={() => [navigate("/admin/data-alternatif")]}
              />
            </>
          ) : null}
          {roleAdmin || roleUstadz ? (
            <>
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
            </>
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
              <LuUsers size={20} />
              <p>Data Alternatif (Santri)</p>
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
            <div className="p-5 border rounded-md">
              <div className="table-responsive mb-5">
                <table className="table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>NISN</th>
                      <th>Nama Santri</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((data, index) => (
                      <tr key={data._id}>
                        <td>{index + 1}</td>
                        <td>{data.nisn}</td>
                        <td>{data.name}</td>
                        <td className="text-center space-x-3">
                          <Tippy content="Edit">
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenUpdate(data._id, data.nisn, data.name)
                              }
                            >
                              <LuFileEdit className="text-success" />
                            </button>
                          </Tippy>
                          <Tippy content="Delete">
                            <button
                              type="button"
                              onClick={() => {
                                handleDelete(data._id, data.name);
                              }}
                            >
                              <LuTrash2 className="text-danger" />
                            </button>
                          </Tippy>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {error && (
                  <div className="text-red-500 mt-2">{error.message}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { DataAlternatif };
