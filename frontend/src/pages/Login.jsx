import { useNavigate } from "react-router-dom";
import logo from "../assets/img/LOGO2.png";
import { useState } from "react";
import { LuAlertTriangle, LuChevronLeft } from "react-icons/lu";
const LoginCover = () => {

  const [auth, setAuth] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({ email: "", password: "", general: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: "",
      general: "",
    });
  };

  const submitForm = async () => {
    event.preventDefault();

    if (!auth.email || !auth.password) {
      setErrors({
        email: !auth.email ? "Email diperlukan" : "",
        password: !auth.password ? "Password diperlukan" : "",
        general: "Mohon isi semua field",
      });
      return;
    }

    try {
      const { email, password } = auth;
      const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responData = await response.json();

      if (!response.ok) {
        setErrors({
          email: "",
          password: "",
          general: responData.message || "Login gagal",
        });
        return;
      }

      const { data } = responData;

      if (response.ok) {
        localStorage.setItem("user", data.access_token);
        localStorage.setItem("role", data.data.role);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-gradient-to-t from-[#fff] to-[#fff] w-1/2  min-h-screen hidden lg:flex flex-col items-center justify-center text-black p-4">
        <div className="w-full mx-auto mb-5">
          <img
            src={logo}
            alt="Logo SMA BARON"
            className="lg:max-w-[370px] xl:max-w-[500px] mx-auto"
          />
        </div>
        <p className="">Sistem Pendukung Keputusan SMA Bina Insan Mandiri</p>
      </div>
      <div className="w-full lg:w-1/2 relative flex justify-center items-center">
        <div className="max-w-[480px] p-5 md:p-10 border-[1px] lg:border-[0px] lg:shadow-none rounded-xl shadow-lg">
          <h2 className="font-semibold text-3xl mb-3">Masuk</h2>
          <p className="mb-7 text-base">
            Masukan email dan password untuk masuk ke Dashboard SPK
          </p>
          <form className="space-y-5" onSubmit={submitForm}>
            <div>
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="Masukan Email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-input"
                placeholder="Masukan Password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success w-full">
              Masuk
            </button>
            {errors.general && (
              <p className="p-3.5 rounded-md text-sm text-danger bg-danger-light flex items-center justify-between">{errors.general}
              <LuAlertTriangle size={20} />
              </p>
            )}
            <div
              className="text-success relative text-sm group cursor-pointer w-full"
              onClick={() => navigate("/")}
            >
              <p className="relative inline-block">
                Kembali ke halaman utama
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-600 group-hover:w-full"></span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCover;
