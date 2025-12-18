import { Component, NgModule } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import 'zone.js'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
