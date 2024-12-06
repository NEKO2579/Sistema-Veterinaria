import { BrowserRouter as Switch, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MisionVision from "./pages/MisionVision";
import NuestraHistoria from "./pages/NuestraHistoria";
import GaleriasFotograficas from "./pages/GaleriasFotograficas";
import Servicess from "./pages/Servicess";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import CitasTable from "./pages/CitasTable";
import { Pets } from "./pages/Pets";
import { CreatePets } from "./pages/CreatePets";
import { EditPets } from "./pages/EditPets";
import MyProfile from "./pages/Profile/MyProfile";
import EditProfile from "./pages/Profile/EditProfile";
import CrearCitaForm from "./pages/CrearCitas";
import EditarCitas from "./pages/EditarCitas";
import CitasEliminadas from "./pages/CitasEliminadasUsuarios";
import PrivateRoute from "./routes/PrivateRoute";





const App = () => (
  <Switch>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/mission" element={<MisionVision />} />
      <Route exact path="/history" element={<NuestraHistoria />} />
      <Route exact path="/gallery" element={<GaleriasFotograficas />} />
      <Route exact path="/servicess" element={<Servicess />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route element={<PrivateRoute />}>
        <Route exact path="/citas/eliminadas" element={<CitasEliminadas />} />
        <Route exact path="/citas/:id/editar" element={<EditarCitas />} />
        <Route exact path="/citas/crearCita" element={<CrearCitaForm />} />
        <Route exact path="/citas" element={<CitasTable />} />
        <Route exact path="/Mascotas" element={<Pets />} />
        <Route exact path="/Mascotas/agregar" element={<CreatePets />} />
        <Route exact path="/Mascotas/editar/:id" element={<EditPets />} />
        <Route exact path="/Perfil" element={<MyProfile />} />
        <Route exact path="/Perfil/editar" element={<EditProfile />} />
      </Route>

      {/* Auth routes */}
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  </Switch>
)


export default App
