import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errors:string[] = [];

  constructor() { }

  removeErrors() {
    this.errors = [];
  }

  addError(error:string) {
    this.errors.push(error);
  }

  removeError(error:string) {
    let index = this.errors.indexOf(error);
    if (index > -1) {
      this.errors.splice(index, 1);
    }
  }

}
