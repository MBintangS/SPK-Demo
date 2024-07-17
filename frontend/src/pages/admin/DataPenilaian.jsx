import {
  LuFolder,
  LuLayoutGrid,
  LuFolderTree,
  LuUsers,
  LuFileEdit,
  LuCalculator,
  LuFileBarChart,
  LuPlusSquare,
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

const DataPenilaian = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [penilaian, setPenilaian] = useState([]);
  const [subKriterias, setSubKriterias] = useState([]);
  const [dataPenilaianStudent, setDataPenilaianStudent] = useState([]);
  const [penilaianStudent, setPenilaianStudent] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [currName, setCurrName] = useState("");
  const [errors, setErrors] = useState({});

  const [serror, setError] = useState("");

  const [roleAdmin, setRoleAdmin] = useState(false);
  const [roleUstadz, setRoleUstadz] = useState(false);
  const [roleManagerial, setRoleManagerial] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const mySwal = withReactContent(Swal);

  useEffect(() => {
    if (role === "Admin") {
      setRoleAdmin(true);
    } else if (role === "Ustadz") {
      setRoleUstadz(true);
    } else if (role === "Managerial") {
      setRoleManagerial(true);
    }
  }, []);

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
      setSubKriterias(data.data);
    } catch (error) {
      console.error("Error fetching sub kriteria:", error);
    }
  };

  //GET PENILAIAN
  const fetchPenilaian = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/penilaian`,
        {
          method: "GET",
        }
      );
      const { data } = await response.json();
      setPenilaian(data);
    } catch (error) {
      setError(error);
    }
  };

  // CREATE PENILAIAN
  const handleSubmit = async () => {
    if (validateForm()) {
      const student_id = studentId;
      const requestBody = {
        student_id,
        kriteria: dataPenilaianStudent,
      };
      console.log(requestBody);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/penilaian`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        if (response.ok) {
          console.log("Penilaian Berhasil Di buat:", data);
          fetchPenilaian();
          handleOpenAdd();
          setDataPenilaianStudent([]);
          setErrors({});
          setStudentId("");
          mySwal.fire({
            title: "Berhasil",
            text: "Penilaian Berhasil ditambahkan",
            icon: "success",
            confirmButtonColor: "#00ab55",
          });
        } else {
          console.error("Error buat penilaian:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  const handleSelectChange = (kriteria_id, sub_kriteria_id) => {
    setDataPenilaianStudent((prevPenilaian) => {
      const existingKriteriaIndex = prevPenilaian.findIndex(
        (item) => item.kriteria_id === kriteria_id
      );
      if (existingKriteriaIndex !== -1) {
        const updatedPenilaian = [...prevPenilaian];
        updatedPenilaian[existingKriteriaIndex].sub_kriteria_id =
          sub_kriteria_id;
        return updatedPenilaian;
      } else {
        return [...prevPenilaian, { kriteria_id, sub_kriteria_id }];
      }
    });
    // Clear the error for this select
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[kriteria_id];
      return updatedErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    subKriterias.forEach((kriteria) => {
      const selectedSubKriteria = dataPenilaianStudent.find(
        (p) => p.kriteria_id === kriteria._id
      );
      if (!selectedSubKriteria) {
        newErrors[kriteria._id] = "* This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (id) => {
    if (validateForm()) {
      const student_id = studentId;
      const requestBody = {
        student_id,
        kriteria: dataPenilaianStudent,
      };
      console.log(requestBody);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/penilaian/:${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        if (response.ok) {
          console.log("Penilaian Berhasil Di buat:", data);
          fetchPenilaian();
          handleOpenUpdate();
          setDataPenilaianStudent([]);
          setErrors({});
          setStudentId("");
          mySwal.fire({
            title: "Berhasil",
            text: "Penilaian Berhasil diUpdate",
            icon: "success",
            confirmButtonColor: "#00ab55",
          });
        } else {
          console.error("Error buat penilaian:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  // console.log(penilaian);
  // console.log(subKriterias);
  // console.log(dataPenilaianStudent);

  useEffect(() => {
    fetchSubKriteria();
    fetchPenilaian();
    // fetchPenilaianByStudentID()
  }, []);

  const handleOpenAdd = (id, name) => {
    setCurrName(name);
    setDataPenilaianStudent([]);
    setErrors({});
    setStudentId(id);
    setOpenAdd((cur) => !cur);
  };

  const getSelectedValue = (kriteria_id) => {
    if (dataPenilaianStudent.length > 0) {
      const currentVal = dataPenilaianStudent.filter(
        (e) => e.kriteria_id == kriteria_id && e
      );
      if (currentVal.length > 0) {
        return currentVal[0].sub_kriteria_id;
      }
    }
  };

  const handleOpenUpdate = (id, name, penilaian) => {
    setOpenUpdate((cur) => !cur);
    if (id && penilaian) {
      setPenilaianStudent(penilaian);
      setStudentId(id);
      setCurrName(name);
      setDataPenilaianStudent([]);
      penilaian.map(({ sub_kriteria_id, kriteria_id }) => {
        handleSelectChange(kriteria_id, sub_kriteria_id);
      });
    }
  };

  return (
    <>
      <Dialog
        open={openAdd}
        handler={handleOpenAdd}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-h-screen overflow-auto">
          <CardBody className="max-h-screen">
            <Typography variant="h4" className="text-gray-700 mb-5">
              Tambah Penilaian <span className="text-success">{currName}</span>
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {subKriterias.map((data) => (
                <div key={data._id}>
                  <Typography variant="h6" className="mb-2">
                    {data.name} (C{data.kode})
                  </Typography>
                  <Select
                    color="green"
                    label={`Pilih ${data.name}`}
                    onChange={(e) => handleSelectChange(data._id, e)}
                  >
                    {data.sub_kriteria.map((sub) => (
                      <Option key={sub._id} value={sub._id}>
                        {sub.name}
                      </Option>
                    ))}
                  </Select>
                  {errors[data._id] && (
                    <Typography variant="small" className="text-red-500">
                      {errors[data._id]}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
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
        open={openUpdate}
        handler={handleOpenUpdate}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-h-screen overflow-auto">
          <CardBody className="max-h-screen">
            <Typography variant="h4" className="text-gray-700 mb-5">
              Edit Penilaian <span className="text-success">{currName}</span>
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {subKriterias.map((data, index) => (
                <div key={data._id}>
                  <Typography variant="h6" className="mb-2">
                    {data.name} (C{data.kode})
                  </Typography>
                  <Select
                    color="green"
                    label={`Pilih ${data.name}`}
                    onChange={(e) => handleSelectChange(data._id, e)}
                    value={getSelectedValue(data._id)}
                  >
                    {data.sub_kriteria.map((sub) => (
                      <Option key={sub._id} value={sub._id}>
                        {sub.name}
                      </Option>
                    ))}
                  </Select>
                  {errors[data._id] && (
                    <Typography variant="small" className="text-red-500">
                      {errors[data._id]}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
          <CardFooter className="pt-0 flex justify-between gap-6">
            <Button
              className="bg-success w-full"
              onClick={() => handleUpdate(studentId)}
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
                      <th className="border-b border-blue-gray-100 bg-success p-4 rounded-tl-lg">
                        <Typography
                          variant="h6"
                          className="text-white font-medium leading-none"
                        >
                          No
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-success p-4">
                        <Typography
                          variant="h6"
                          className="text-white font-medium leading-none"
                        >
                          NISN
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-success p-4">
                        <Typography
                          variant="h6"
                          className="text-white font-medium leading-none"
                        >
                          Nama Santri
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
                    {penilaian.map((data, index) => {
                      return (
                        <tr key={data._id} className="even:bg-blue-gray-50/50">
                          <td>
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="font-normal text-center"
                            >
                              A{index + 1}
                            </Typography>
                          </td>
                          <td>
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="font-normal text-center"
                            >
                              {data.nisn}
                            </Typography>
                          </td>
                          <td>
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.name}
                            </Typography>
                          </td>
                          <td className="text-center space-x-3">
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="font-normal text-center"
                            >
                              {data.penilaian.length > 0 ? (
                                <Tippy content="Edit Nilai">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenUpdate(
                                        data._id,
                                        data.name,
                                        data.penilaian
                                      )
                                    }
                                  >
                                    <LuFileEdit
                                      className="text-warning"
                                      size={20}
                                    />
                                  </button>
                                </Tippy>
                              ) : (
                                <Tippy content="Tambah Nilai">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenAdd(data._id, data.name)
                                    }
                                  >
                                    <LuPlusSquare
                                      className="text-success"
                                      size={20}
                                    />
                                  </button>
                                </Tippy>
                              )}
                            </Typography>
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
