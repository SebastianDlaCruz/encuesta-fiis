import './App.css'
import { Routes, Route } from 'react-router-dom';
import { ModuleRoute } from 'module-routes';
import Admin from 'app/admin/Admin';
import Auth from 'app/auth/Auth';
import User from 'app/user/User';
import PrivateRoute from 'app/router/PrivateRoute';

const App: React.FC = () => {

  return (
    <Routes>
      <Route path={`${ModuleRoute.Auth}/*`} element={<Auth />} />
      <Route path={`${ModuleRoute.Admin}/*`} element={<PrivateRoute><Admin /></PrivateRoute>} />
      <Route path={`${ModuleRoute.User}/*`} element={<PrivateRoute><User /></PrivateRoute>} />
    </Routes>
  )
}

export default App
