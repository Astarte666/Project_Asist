import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user";

@Injectable({
    providedIn: "root",
})

export class ClasesService{

    constructor (private http: HttpClient, private userService: UserService) {}

    
}