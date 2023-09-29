import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import {getAuth, updateProfile} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,

  ) { }

  //======= Autenticacion ========
  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email,password)
  }

  signinUp(user: User){
    return this.auth.createUserWithEmailAndPassword(user.email,user.password)
  }

  updateUser(user: any){
    const auth = getAuth();
    return updateProfile(auth.currentUser, user)
  }
  mailLogueado(){
    return this.auth.authState;
  }
  logout(){
    return this.auth.signOut();
  }
}
