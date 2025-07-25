import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  template: '<canvas id="attendanceChart"></canvas>',
  styleUrl: './dashboard.css'
})
export class Dashboard  {

  }
