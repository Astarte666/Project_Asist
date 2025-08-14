import { Component } from '@angular/core';
import { ModalStudent } from './modal-student/modal-student';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-student',
  imports: [RouterLink, ModalStudent],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class Student {

}
