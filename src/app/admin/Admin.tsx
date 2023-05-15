import { Navigate, Route, Routes } from "react-router-dom";
import { AdminPath, getAdminRoutes } from "app/admin/admin-routes";
import { Provider } from "react-redux";
import store from "./store/store";
import Init from "./pages/Init/Init";
import Layout from "app/shared/components/Layout/Layout";
import Encuesta from "./pages/Encuesta/Encuesta";

const Admin: React.FC = () => {

  return (
    <Layout>
      <Routes>
        <Route path={AdminPath.Init} element={<Provider store={store}><Init /></Provider>} />
        <Route path={AdminPath.EncuestaById} element={<Provider store={store}><Encuesta /></Provider>} />
        <Route path="*" element={<Navigate replace to={getAdminRoutes(AdminPath.Init)} />} />
      </Routes>
    </Layout>
  )
}

export default Admin;