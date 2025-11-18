import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environments";
import { UserService } from "./user";


@Injectable({
  providedIn: "root",
})
export class AsistenciaService{

constructor(private http: HttpClient, private userService: UserService) {}



}