import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  idCounter:number = 0;
  errors:Error[] = [];

  constructor() { }

  removeErrors() {
    this.errors = [];
  }

  addError(error:string, date:Date) {
    this.errors.push({id: this.idCounter++, message: error, timestamp:date});
  }

  removeError(id:number) {
    let index = this.errors.findIndex(x => x.id == id);
    if (index > -1) {
      this.errors.splice(index, 1);
    }
  }

}

export interface Error {
  id:number,
  message:string,
  timestamp:Date
}
