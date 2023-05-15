import { ModuleRoute } from "module-routes";

export enum AuthPath {
  Login = '/',
};

export const AuthModules = new Map<AuthPath, string>([
  [AuthPath.Login, `${ModuleRoute.Auth}${AuthPath.Login}`]
]);

export const getAuthRoutes = (route: AuthPath): string => {
  return AuthModules.get(route) as string;
}