import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Colors } from "app/shared/utils/colors";
import { useNavigate } from "react-router-dom";
import { AuthPath, getAuthRoutes } from "app/auth/auth-routes";
import HeaderStyled from "./Header.styled"
import { useSelector } from "react-redux";
import { AppStoreState } from "store/store";
import { useDispatch } from "react-redux";
import { initData } from "store/appSlice";
import { ModuleRoute } from "module-routes";
import { CargoUser } from "store/types";

const Header: React.FC = () => {
    const { user } = useSelector((state: AppStoreState) => state.app);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onBack = () => {
        dispatch(initData());
        navigate(getAuthRoutes(AuthPath.Login));
    }

    const onNavigatePage = () => {
        user?.cargo === CargoUser.Admin ? navigate(-1) : navigate(-1)
    }

    return (
        <AppBar position="fixed" sx={{ backgroundColor: Colors.Primary }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography onClick={onNavigatePage} variant="h5" noWrap component="h2" fontWeight="bold" sx={{cursor: 'pointer'}}>
                    Encuesta FIIS
                </Typography>
                <Box display="flex" alignItems="center" gap={3}>
                    <Typography fontWeight="bold" >
                        Bienvenido {user?.username}
                    </Typography>
                    <HeaderStyled.ButtonHeader onClick={onBack}>
                        <Typography fontSize="14px">
                            Cerrar sesión
                        </Typography>
                    </HeaderStyled.ButtonHeader>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;