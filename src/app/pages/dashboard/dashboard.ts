import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, model } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  template: '<canvas id="attendanceChart"></canvas>',
  styleUrl: './dashboard.css'
})
export class Dashboard  {

  }
