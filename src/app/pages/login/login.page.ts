import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formRegistro:FormGroup;
  
  constructor(private auth : AuthService,private fb : FormBuilder, private router: Router, private utilservice: UtilsService) { 
    this.formRegistro = this.fb.group(
      {
        'email':['',[Validators.required,Validators.email]],
        'pass':['',[Validators.required,Validators.minLength(6)]]
      }
    );
  }

  ngOnInit() {
  }

  login(){
    if (this.formRegistro.valid) {
      //console.log(this.form.value);
      this.utilservice.presentLoading({message: 'Validando...',spinner: 'crescent',cssClass: 'custom-loading'})
      this.auth.login(this.formRegistro.value.email, this.formRegistro.value.pass).then(async res =>{
        let user: User={
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }
        this.utilservice.dismissLoading();
        this.utilservice.setElementInLocalstorage('user',user)
        this.utilservice.routerLink('/home')
        this.router.navigate(['/home'], { queryParams: user });
        
        
        
        this.utilservice.presentToast({
          message: `Te damos la bienvenida ${user.email}`,
          duration: 1500,
          cssClass: 'toast-bg',
          icon: 'person-outline',
          position:'top'
        })

        this.formRegistro.reset();
      }, error =>{
        this.utilservice.dismissLoading();
        this.utilservice.presentToast({
          message: 'Usuario y/o contraseña inválida',
          duration: 1500,
          cssClass: 'toast-bg',
          icon: 'alert-circle-outline',
          position:'top'
        })
      })
  }
}

  logueoRapido(email:string,pass:string){
    this.formRegistro.controls['email'].patchValue(email);
    this.formRegistro.controls['pass'].patchValue(pass);
  }

}