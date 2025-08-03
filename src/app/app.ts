import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'New_Project_Asist';

  loggedUserName: string ='';

  constructor() {
    const loggedData = localStorage.getItem("user");

    if (loggedData != null){
      this.loggedUserName = loggedData;
    }
}

//crear roles para cambiar los datos de la sidebar

}