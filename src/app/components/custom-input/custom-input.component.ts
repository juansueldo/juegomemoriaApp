import { NgIf } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA ,Component, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomInputComponent  implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() icon: string;
  @Input() type: string;
  @Input() autocomplete: string;

  isPassword: boolean;

  hide: boolean = true;
  constructor() { }

  ngOnInit() {
    if(this.type === 'password'){
      this.isPassword = true;
    }

    
  }
  showOrHidePassword(){
    this.hide = !this.hide;

    if(this.hide){
      this.type='password';
    }
    else{
      this.type='text';
    }
  }
}

