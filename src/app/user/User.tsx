import { Navigate, Route, Routes } from "react-router-dom";
import { UserPath, getUserRoutes } from "app/user/user-routes";
import Init from "./pages/Init/Init";

const User: React.FC = () => {

  return (
    <Routes>
      <Route path={UserPath.Init} element={<Init />} />
      <Route path="*" element={<Navigate replace to={getUserRoutes(UserPath.Init)} />} />
    </Routes>
  )
}

export default User;