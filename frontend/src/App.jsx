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
import PrivateRoute from "./context/Private";

const adminRoutes = [
  { path: "/admin/dashboard", element: <Dashboard />, roles: ['Admin', 'Ustadz', 'Managerial', 'User'] },
  { path: "/admin/data-kriteria", element: <DataKriteria />, roles: ['Admin', 'Managerial'] },
  { path: "/admin/data-sub-kriteria", element: <DataSubKriteria />, roles: ['Admin', 'Managerial'] },
  { path: "/admin/data-alternatif", element: <DataAlternatif />, roles: ['Admin', 'Managerial'] },
  { path: "/admin/data-penilaian", element: <DataPenilaian />, roles: ['Admin', 'Ustadz'] },
  { path: "/admin/data-perhitungan", element: <DataPerhitungan />, roles: ['Admin', 'Ustadz'] },
  { path: "/admin/data-hasil-akhir", element: <DataHasilAkhir />, roles: ['Admin', 'Ustadz', 'Managerial', 'User'] },
];

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

        {/* Admin Pages */}
        {adminRoutes.map(({ path, element, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute roles={roles}>
                {element}
              </PrivateRoute>
            }
          />
        ))}
        
      </Routes>
    </>
  );
}

export default App;
