import { AuthPath, getAuthRoutes } from "app/auth/auth-routes";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";

const Auth: React.FC = () => {

  return (
    <Routes>
      <Route path={AuthPath.Login} element={<Login />} />
      <Route path="*" element={<Navigate replace to={getAuthRoutes(AuthPath.Login)} />} />
    </Routes>
  )
}

export default Auth;