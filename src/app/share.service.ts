import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private unit!: String;
  private user!: String;
  private id!: String;


  constructor() { }

setUnit(unit: String) {
  this.unit = unit;
}

getUnit() {
  return this.unit
}

setUser(user: String) {
  this.user = user
}
getUser() {
  return this.user;
 
}

setAcesso(user: String) {
  this.user = user
}
getAcesso() {
  return this.user;
 }
}

