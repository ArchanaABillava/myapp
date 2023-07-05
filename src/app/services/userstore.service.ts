import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoreService {


  private role$ = new BehaviorSubject<string>("");
  private actort$ = new BehaviorSubject<string>("");
  private nameid$ = new BehaviorSubject<string>("");

  constructor() { }


  public getRoleFromStore() {
    return this.role$.asObservable()
  }
  public setRoleForStore(role: string) {
    this.role$.next(role);
  }
  public getAccountFromStore() {
    return this.actort$.asObservable();
  }
  public setAccountForStore(role: string) {
    this.actort$.next(role);
  }
 
  public getCustomerIdFromStore() {
    return this.nameid$.asObservable();
  }

  public setCustomerIdFromStore(nameid: string) {
    this.nameid$.next(nameid);
  }



}
