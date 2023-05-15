// Types by state
export enum CargoUser {
  Estudiante = 'estudiante',
  Admin = 'administrador'
};


export interface UserProfile {
  id: string;
  username: string;
  cargo: string

}

export interface AppState {
  isFetching: boolean,
  user: UserProfile | null,
}