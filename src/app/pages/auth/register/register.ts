import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
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
