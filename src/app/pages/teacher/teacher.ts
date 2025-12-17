import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarrerasService, Materia } from '../../core/services/carreras';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-teacher',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css'
})
export class Teacher {

}
