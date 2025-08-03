import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  step =1;
  nextStep() {
    this.step++;
  }
  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }
}
