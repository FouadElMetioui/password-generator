import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PasswordComponent} from "./components/password/password.component";
import {FeaturesComponent} from "./components/features/features.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PasswordComponent, FeaturesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'password-generater';
}
