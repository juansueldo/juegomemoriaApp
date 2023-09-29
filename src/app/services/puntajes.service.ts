import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PuntajesService {
  
  itemsCollection !: AngularFirestoreCollection<any>;
  puntajes !: Observable<any[]>;

  constructor(private firestore : AngularFirestore) { }

  guardarDatos(data : any){
    this.firestore.collection('puntajes').add(data);
  }

  traerPuntajes(){
    this.itemsCollection = this.firestore.collection<any>('puntajes');
    return this.puntajes = this.itemsCollection.valueChanges();
  }
}