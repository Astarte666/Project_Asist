import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../../shared/components/header/header';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-private',
  imports: [RouterModule, Header, Sidebar, Footer],
  templateUrl: './private.html',
  styleUrl: './private.css'
})
export class Private {

}
