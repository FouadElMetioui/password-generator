import {Component, signal, inject, computed} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {selectPassword} from "../../store/password/password.selectors";
import {generatePassword} from "../../store/password/password.actions";
import {NgClass} from "@angular/common";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})


export class FeaturesComponent {
  length: number = 4;
  includeUpperCase = signal(false);
  includeLowerCase = signal(false);
  includeNumbers = signal(false);
  includeSymbols = signal(false);
  strength = computed(() => {
    const features = [this.includeNumbers(),this.includeSymbols(), this.includeLowerCase(), this.includeUpperCase()]
    let l = 0;
    for (const f of features) {
        if(f)
          ++l;
    }
    switch (l) {
      case 0 : return '';
      case 1 : return 'Weak';
      case 2 : return 'Moderate';
      case 3 : return 'Strong';
      case 4 : return 'Very Strong';
      default: return '';
    }
  });


  store = inject(Store)


  password!: string;

  ngOnInit() {
    this.store.select(selectPassword).subscribe((res) => {
      this.password = res;
    })
  }

  generatePasswordDispatcher = () => {
    const pass = this.generatePassword();
    this.store.dispatch(generatePassword({password: pass}))
  }

  generatePassword = (): string => {

    let pass = '';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '@#$=)&%?!*(';

    // List to hold at least one character from each chosen category
    let guaranteedCharacters: string[] = [];
    let charSet = '';

    // Ensure at least one character from each selected category is included
    if (this.includeUpperCase()) {
      guaranteedCharacters.push(upper[Math.floor(Math.random() * upper.length)]);
      charSet += upper;
    }
    if (this.includeLowerCase()) {
      guaranteedCharacters.push(lower[Math.floor(Math.random() * lower.length)]);
      charSet += lower;
    }
    if (this.includeNumbers()) {
      guaranteedCharacters.push(numbers[Math.floor(Math.random() * numbers.length)]);
      charSet += numbers;
    }
    if (this.includeSymbols()) {
      guaranteedCharacters.push(symbols[Math.floor(Math.random() * symbols.length)]);
      charSet += symbols;
    }

    if (charSet.length === 0) {
      Swal.fire({
        title: "Please selection an option !",
        icon: "error"
      });
      return this.password ;
    }

    // Fill the rest of the password with random characters from the full charSet
    for (let i = guaranteedCharacters.length; i < this.length; i++) {
      let randomIndex = Math.floor(Math.random() * charSet.length);
      pass += charSet[randomIndex];
    }

    // Combine guaranteed characters with the random ones
    pass += guaranteedCharacters.join('');

    // Shuffle the password to avoid guaranteed characters being at the start
    pass = pass.split('').sort(() => Math.random() - 0.5).join('');

    return pass;


  }

}
