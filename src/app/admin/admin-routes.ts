import { ModuleRoute } from "module-routes";

export enum AdminPath {
    Init = '/',
    Encuesta = '/encuesta',
    EncuestaById = '/encuesta/:id'
};

export const AdminModules = new Map<AdminPath, string>([
    [AdminPath.Init,`${ModuleRoute.Admin}${AdminPath.Init}`],
    [AdminPath.Encuesta,`${ModuleRoute.Admin}${AdminPath.Encuesta}`],
    [AdminPath.EncuestaById,`${ModuleRoute.Admin}${AdminPath.EncuestaById}`],
]);

export const getAdminRoutes = (route: AdminPath): string =>{
    return AdminModules.get(route) as string;
}