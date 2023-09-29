import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PuntajesService } from 'src/app/services/puntajes.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  puntajes : any = [];
  top5 : any = []
  nivel : string = ''
  cargando : boolean = true;

  constructor(public auth : AuthService, private db : PuntajesService) { 
    this.db.traerPuntajes().subscribe(data => {
      data.sort(function(a, b) {
        return a.segundos - b.segundos;
      });
      this.puntajes = data;
      this.top5 = this.puntajes.filter((a: { nivel: string; }) => a.nivel === 'fácil')
      this.top5 = this.top5.slice(0, 5);
      this.nivel = 'fácil';
      setTimeout(() => {
        this.cargando = false        
      }, 2000);
    })
  }

  ngOnInit() {
  }
  
  tipoResultado(tipo : number){
    switch (tipo) {
      case 1:
        this.top5 = this.puntajes.filter((a: { nivel: string; }) => a.nivel === 'fácil')
        this.top5 = this.top5.slice(0, 5);
        this.nivel = 'fácil';
        break;
      case 2:
        this.top5 = this.puntajes.filter((a: { nivel: string; }) => a.nivel === 'medio')
        this.top5 = this.top5.slice(0, 5);
        this.nivel = 'medio';
        break;
      case 3:
        this.top5 = this.puntajes.filter((a: { nivel: string; }) => a.nivel === 'difícil')
        this.top5 = this.top5.slice(0, 5);
        this.nivel = 'difícil';
        break;
    
      
    }
  }

}