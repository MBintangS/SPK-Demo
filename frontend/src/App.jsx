import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Home from "./pages/Home";
import LoginCover from "./pages/Login";
import {
  Dashboard,
  DataAlternatif,
  DataHasilAkhir,
  DataKriteria,
  DataPenilaian,
  DataPerhitungan,
  DataSubKriteria,
  KelolaAdmin
} from "./pages/admin";

  

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MobileMenu />
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/auth/login"
          element={
            <>
              <LoginCover />
            </>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        />
        <Route
          path="/admin/data-kriteria"
          element={
            <>
              <DataKriteria />
            </>
          }
        />
        <Route
          path="/admin/data-sub-kriteria"
          element={
            <>
              <DataSubKriteria />
            </>
          }
        />
        <Route
          path="/admin/data-alternatif"
          element={
            <>
              <DataAlternatif />
            </>
          }
        />
        <Route
          path="/admin/data-penilaian"
          element={
            <>
              <DataPenilaian />
            </>
          }
        />
        <Route
          path="/admin/data-perhitungan"
          element={
            <>
              <DataPerhitungan />
            </>
          }
        />
        <Route
          path="/admin/data-Hasil-akhir"
          element={
            <>
              <DataHasilAkhir />
            </>
          }
        />
        <Route
          path="/admin/kelola-admin"
          element={
            <>
              <KelolaAdmin />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
