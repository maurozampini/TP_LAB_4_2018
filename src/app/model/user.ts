export enum ERol {
    CLIENTE = 0,
    ENCARGADO = 1,
    CHOFER = 2
}

export class Usuario {
    activo : boolean;
    usuarioID : number;
    nombre : string;
    apellido : string;
    email : string;
    password : string;
    rol : ERol;
    foto : string;
}

export interface ResponseRegister {
    status : string;
}

export interface Credentials {
    email : string;
    password : string;
}

export interface ResponseLogin {
    token : string;
}

export interface AuthData {
    usuario : string;
    rol : ERol;
}