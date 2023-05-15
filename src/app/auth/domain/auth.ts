import { CargoUser } from "store/types";

export interface UserResponse extends Omit<User,"id">{};

export interface User {
    id: string,
    username: string,
    password: string;
    cargo: CargoUser;
};