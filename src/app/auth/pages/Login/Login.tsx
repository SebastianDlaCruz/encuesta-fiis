import { AccountCircle } from "@mui/icons-material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import amber from "@mui/material/colors/amber";
import { AdminPath, getAdminRoutes } from "app/admin/admin-routes";
import { getUsersFb } from "app/auth/firebase/login";
import { Colors } from "app/shared/utils/colors";
import { UserPath, getUserRoutes } from "app/user/user-routes";
import ImgLogo from 'assets/images/logo.jpg';
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initUser } from "store/appSlice";
import { CargoUser } from "store/types";
import * as Yup from 'yup';
import LoginStyled from "./Login.styled";

const Login: React.FC = () => {
  const [hasUser, setHasUser] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    user: Yup
      .string()
      .required('El usuario es requerido'),
    password: Yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: ({ user, password }) => {
      verifyLogin(user, password);
    }
  });

  const verifyLogin = async (user: string, password: string) => {

    getUsersFb(user, password)
      .then((response) => {

        if (response.ok && response.uid && response.email) {
          setHasUser(false);
          dispatch(initUser({
            cargo: 'administrador',
            username: response.email,
            id: response.uid
          })); w
          navigate('administrador' === CargoUser.Admin ? getAdminRoutes(AdminPath.Init) : getUserRoutes(UserPath.Init))
        } else {
          setHasUser(true);
          console.error(response.errorMessage);
        }
      })

    /* const usersFb = await getUsersFb();
    const hasUser = usersFb.find(userFb => (userFb.username === user && userFb.password === password));
    if (hasUser) {
      setHasUser(false);
      dispatch(initUser({
        cargo: hasUser.cargo,
        username: hasUser.username
      }))
      navigate(hasUser.cargo === CargoUser.Admin ? getAdminRoutes(AdminPath.Init) : getUserRoutes(UserPath.Init))
    } else {
      setHasUser(true);
    } */
  }

  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      sx={{ backgroundColor: amber[50] }}
    >
      <Card sx={{ width: '70%', height: 450 }}>
        <Grid container sx={{ width: '100%', height: '100%' }}>
          <Grid item xs={6} height='100%'>
            <LoginStyled.Logo src={ImgLogo} alt="" />
          </Grid>
          <Grid item xs={6} height='100%'>
            <LoginStyled.FormContainer onSubmit={formik.handleSubmit}>
              <Stack sx={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: 10
              }} spacing={1}>
                <Typography fontWeight="bold" fontSize={24}>
                  Iniciar Sesión
                </Typography>
                <AccountCircle sx={{
                  fontSize: 80,
                  color: Colors.Primary
                }} />
                {hasUser && <Typography sx={{ backgroundColor: Colors.Close, width: '100%', color: Colors.White, textAlign: 'center', padding: '6px 0', borderRadius: 1 }} fontWeight="bold" fontSize={14}>
                  Credenciales incorrectas
                </Typography>}
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="user"
                  label="Usuario"
                  onChange={formik.handleChange}
                  value={formik.values.user}
                  error={formik.touched.user && Boolean(formik.errors.user)}
                  helperText={formik.touched.user && formik.errors.user}
                />
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  name="password"
                  label="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <LoginStyled.ButtonLogin type="submit">
                  <Typography fontWeight="bold" fontSize={14}>
                    Ingresar
                  </Typography>
                </LoginStyled.ButtonLogin>
              </Stack>
            </LoginStyled.FormContainer>
          </Grid>
        </Grid>

      </Card>
    </Grid>
  )
}

export default Login;