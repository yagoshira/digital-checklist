import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private request: any= null;
  private matricula: any;

  constructor() { }

    setDados(request: Object) {
        this.request = request
    }

    getDados(): any {
        return this.request
    }

    setMatricula(matricula: any) {
      this.matricula = matricula
      console.log(this.matricula)
    }

    getMatricula(): any {
      return this.matricula
    }
  }