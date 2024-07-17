import {
  LuFolder,
  LuLayoutGrid,
  LuFolderTree,
  LuUsers,
  LuFileEdit,
  LuCalculator,
  LuFileBarChart,
  LuTrash2,
  LuPlus,
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
  Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DataSubKriteria = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [openAdd, setOpenAdd] = useState(false);
  const [subKriterias, setSubKriterias] = useState([]);
  const [kriteriaID, setKriteriaID] = useState("");
  const [subkriteriaID, setSubKriteriaID] = useState("");
  const [kriteriaName, setKriteriaName] = useState("");
  const [kriteriaKode, setKriteriakode] = useState("");
  const [subKriteriaName, setSubKriteriaName] = useState("");
  const [curSubKriteriaName, setCurSubKriteriaName] = useState("");
  const [score, setScore] = useState(0);

  const [scoreError, setScoreError] = useState("");
  const [subKriteriaError, setSubKriteriaError] = useState("");
  const [serverError, setServerError] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);

  const [roleAdmin, setRoleAdmin] = useState(false);
  const [roleUstadz, setRoleUstadz] = useState(false);
  const [roleManagerial, setRoleManagerial] = useState(false);

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

  // GET ALL Sub Kriteria
  const fetchSubKriteria = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/sub-kriteria`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      setSubKriterias(data.data);
    } catch (error) {
      console.error("Error fetching sub kriteria:", error);
    }
  };

  console.log(subKriterias);

  // CREATE Sub Kritera By Kriteria ID
  const handleSubmit = async (e) => {
    e.preventDefault();
    setScoreError("");
    setSubKriteriaError("");

    let isValid = true;
    if (!subKriteriaName) {
      setSubKriteriaError("Masukan Keterangan");
      isValid = false;
    }
    if (!score) {
      setScoreError("Masukan Nilai");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    const name = subKriteriaName;
    const kriteria_id = kriteriaID;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/sub-kriteria`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, score, kriteria_id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message);
        return;
      }

      if (response.ok) {
        console.log("Sub Kriteria Berhasil Di buat:", data);
        fetchSubKriteria();
        setScore("");
        setSubKriteriaName("");
        handleOpenAdd();
        mySwal.fire({
          title: "Berhasil",
          text: "Sub Kriteria Berhasil ditambahkan",
          icon: "success",
          confirmButtonColor: "#00ab55",
        });
      } else {
        console.error("Error buat Sub Kriteria:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // DELETE Sub Kriteria
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
            `${process.env.REACT_APP_API_URL}/sub-kriteria/${id}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            console.log("Sub Kriteria berhasil dihapus");
            fetchSubKriteria();
          } else {
            const data = await response.json();
            console.error("Error hapus sub Kriteria:", data.message);
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

  // UPDATE Sub Kriteria
  const handleUpdate = async (id) => {
    setScoreError("");
    setSubKriteriaError("");

    let isValid = true;
    if (!subKriteriaName) {
      setSubKriteriaError("Masukan Keterangan");
      isValid = false;
    }
    if (!score) {
      setScoreError("Masukan Nilai");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    const name = subKriteriaName;
    const kriteria_id = kriteriaID;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/sub-kriteria/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, score, kriteria_id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message);
        return;
      }

      if (response.ok) {
        console.log("Sub Kriteria Berhasil Di Update:", data);
        fetchSubKriteria();
        setScore("");
        setSubKriteriaName("");
        handleOpenUpdate();
        mySwal.fire({
          title: "Berhasil",
          text: "Sub Kriteria Berhasil diUpdate",
          icon: "success",
          confirmButtonColor: "#00ab55",
        });
      } else {
        console.error("Error update Sub Kriteria:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchSubKriteria();
  }, []);

  const handleOpenAdd = (name, kode, id) => {
    console.log("kriteria_id : ", id);
    setKriteriaName(name);
    setKriteriakode(kode);
    setKriteriaID(id);
    setOpenAdd((cur) => !cur);
  };

  const handleOpenUpdate = (id, name, score, id_kriteria) => {
    setKriteriaID(id_kriteria);
    setSubKriteriaID(id);
    setCurSubKriteriaName(name);
    setSubKriteriaName(name);
    setScore(score);
    setOpenUpdate((cur) => !cur);
  };

  return (
    <>
      <Dialog
        size="xs"
        open={openUpdate}
        handler={handleOpenUpdate}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-success">
              Edit {curSubKriteriaName}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Keterangan
            </Typography>
            <Input
              label="masukan keterangan"
              size="lg"
              type="text"
              value={subKriteriaName}
              onChange={(e) => setSubKriteriaName(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Nilai
            </Typography>
            <Input
              label="masukan score"
              size="lg"
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </CardBody>
          <CardFooter className="pt-0 flex justify-between gap-6">
            <Button
              className="bg-success w-full"
              onClick={() => handleUpdate(subkriteriaID)}
            >
              Edit
            </Button>
            <Button className="bg-gray-400 w-full" onClick={handleOpenUpdate}>
              Batal
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      <Dialog
        size="xs"
        open={openAdd}
        handler={handleOpenAdd}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-success">
              Tambah sub kriteria
              <div className="text-base">
                ({kriteriaName} - C{kriteriaKode})
              </div>
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Keterangan
            </Typography>
            <Input
              label="masukan keterangan"
              size="lg"
              type="text"
              value={subKriteriaName}
              onChange={(e) => setSubKriteriaName(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Nilai
            </Typography>
            <Input
              label="masukan score"
              size="lg"
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            />
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

        <div className="bg-white border-b-[1px] w-full">
          <div className="p-4 ms-[275px]">
            <div className="flex items-center gap-2 text-gray-600 font-semibold dark:text-white-dark">
              <LuFolderTree size={20} />
              <p>Data Sub Kriteria</p>
            </div>
          </div>
        </div>

        <div className="p-4 pt-2 ms-[275px]">
          {subKriterias.map((data) => {
            return (
              <div
                key={data._id}
                className="w-full flex flex-col mt-3 bg-white shadow-md rounded-md"
              >
                <div className="border p-2 rounded-t-md ps-5 text-xl flex items-center justify-between">
                  <span>
                    {data.name} (C{data.kode})
                  </span>
                  <button
                    type="button"
                    className="btn bg-success border-none text-white items-center gap-2"
                    onClick={() =>
                      handleOpenAdd(data.name, data.kode, data._id)
                    }
                  >
                    <span>Tambah</span>
                    <LuPlus />
                  </button>
                </div>
                <div className="p-5 border rounded-b-md">
                  {data.sub_kriteria.length > 0 ? (
                    <div className="table-responsive mb-5">
                      <table className="table-hover">
                        <thead>
                          <tr>
                            <th className="border-b border-blue-gray-100 bg-success p-4 rounded-tl-lg">
                              <Typography
                                variant="h6"
                                className="text-white font-medium leading-none"
                              >
                                Deskripsi Sub Kriteria
                              </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-success p-4">
                              <Typography
                                variant="h6"
                                className="text-white font-medium leading-none"
                              >
                                Nilai
                              </Typography>
                            </th>
                            <th className="text-center border-b border-blue-gray-100 bg-success p-4 rounded-tr-lg">
                              <Typography
                                variant="h6"
                                className="text-white font-medium leading-none"
                              >
                                Action
                              </Typography>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.sub_kriteria.map((sub) => (
                            <tr
                              key={sub._id}
                              className="even:bg-blue-gray-50/50"
                            >
                              <td className="p-4">
                                <Typography
                                  variant="paragraph"
                                  color="blue-gray"
                                  className="font-normal text-center"
                                >
                                  {sub.name}
                                </Typography>
                              </td>
                              <td>
                                {" "}
                                <Typography
                                  variant="paragraph"
                                  color="blue-gray"
                                  className="font-normal text-center"
                                >
                                  {sub.score}
                                </Typography>
                              </td>
                              <td className="text-center space-x-3">
                                <Typography
                                  variant="paragraph"
                                  color="blue-gray"
                                  className="font-normal text-center"
                                >
                                  <Tippy content="Edit">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleOpenUpdate(
                                          sub._id,
                                          sub.name,
                                          sub.score,
                                          data._id
                                        )
                                      }
                                    >
                                      <LuFileEdit
                                        className="text-success"
                                        size={20}
                                      />
                                    </button>
                                  </Tippy>
                                  <Tippy content="Delete">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDelete(sub._id, sub.name)
                                      }
                                    >
                                      <LuTrash2
                                        className="text-danger"
                                        size={20}
                                      />
                                    </button>
                                  </Tippy>
                                </Typography>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      Tidak ada sub kriteria
                    </div>
                  )}
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
