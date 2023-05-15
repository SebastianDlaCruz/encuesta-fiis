import { ModuleRoute } from "module-routes";

export enum UserPath {
    Init = '/',
};

export const UserModules = new Map<UserPath, string>([
    [UserPath.Init,`${ModuleRoute.Admin}${UserPath.Init}`]
]);

export const getUserRoutes = (route: UserPath): string =>{
    return UserModules.get(route) as string;
}