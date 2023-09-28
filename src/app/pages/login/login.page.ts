import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })
  constructor(private firebaseSvc: AuthService,
    private utilsSvc: UtilsService,
    private route: Router) { }

  ngOnInit() {
  }
  submit() {
    if (this.form.valid) {
      //console.log(this.form.value);
      this.utilsSvc.presentLoading({message: 'Autenticando...',spinner: 'bubbles',cssClass: 'custom-loading'})
      this.firebaseSvc.login(this.form.value as User).then(async res =>{
        let user: User={
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }
        this.utilsSvc.setElementInLocalstorage('user',user)
        this.utilsSvc.routerLink('/home')
        this.route.navigate(['/home'], { queryParams: user });
        
        
        this.utilsSvc.dismissLoading();
        this.utilsSvc.presentToast({
          message: `Te damos la bienvenida ${user.email}`,
          duration: 1500,
          cssClass: 'toast-bg',
          icon: 'person-outline'
        })

        this.form.reset();
      }, error =>{
        this.utilsSvc.presentToast({
          message: 'Usuario y/o contraseña inválida',
          duration: 1500,
          cssClass: 'toast-bg',
          icon: 'alert-circle-outline'
        })
        this.utilsSvc.dismissLoading();
      })
    }
  }
  signup(){
    this.utilsSvc.routerLink('/signup')
  }
  logueoRapido(email:string, pass:string){
    this.form.controls['email'].setValue(email);
    this.form.controls['password'].setValue(pass);
  }

}