import { Injectable } from '@angular/core';

export interface User {
  id?: number,
  userDocumento: string,
  userApellido: string,
  userNombre: string,
  userTelefono: string,
  userProvincia: string,
  userLocalidad: string,
  userDomicilio: string,
  userAceptado: boolean,
  email: string,
  password: string,
  email_verified_at?: boolean,
  created_at?: string,
  updated_at?: string,
  rol?: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  User: User = {
    userDocumento: "",
    userApellido: "",
    userNombre: "",
    userTelefono: "",
    userProvincia: "",
    userLocalidad: "",
    userDomicilio: "",
    userAceptado: false,
    email: "",
    password: ""
  };

  constructor() {}

  setUser(user: User) {
    this.User = user;
  }

  getUser(): User {
    return this.User;
  }
}
