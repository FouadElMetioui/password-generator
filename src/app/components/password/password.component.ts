import {Component, inject, Inject} from '@angular/core';
import {selectPassword} from "../../store/password/password.selectors";
import {Store} from "@ngrx/store";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

  store = inject(Store)

  password!: string;
  copySuccess: boolean = false;

  ngOnInit() {
    this.store.select(selectPassword).subscribe((res) => {
      this.password = res;
    })
  }

  truncut = () => {
    return this.password.length > 15 ? this.password.slice(0, 15) + ' ...' : this.password;
  }

  copyPassword = () => {
    navigator.clipboard.writeText(this.password).then(() => {
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 2000);
    }).catch(err => {
      console.error('Erreur lors de la copie du texte :', err);
    });
  }
}
