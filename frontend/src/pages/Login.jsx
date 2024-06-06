import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/img/LOGO2.png";
import { useEffect, useState } from "react";

const LoginCover = () => {
  const [auth, setAuth] = useState({
    email: null,
    password: null
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitForm = async () => {
    if (!auth.email || !auth.password) {
      console.error("required");
      return
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

      // const json = await response.json();

      if (!response.ok) {
        throw new Error("Gagal melakukan permintaan.");
      }

      
      const {data} = await response.json();

      console.log(data.access_token)

      if(response.ok) {
        localStorage.setItem("user", JSON.stringify(data.access_token));
        navigate('/admin/dashboard')
      }


      console.log(data.access_token);
  
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
          <div className="space-y-5" >
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
            <button type="button" onClick={submitForm} className="btn btn-success w-full">
              Masuk
            </button>
            {/* {error && <div className="error">{error}</div>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCover;
