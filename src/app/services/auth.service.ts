import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7080/api/UserReg/"
  private userPayload:any;

  constructor(private http:HttpClient,private router:Router) { 
    this.userPayload = this.decodedToken();
  }
  
  signUp(userObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}registers`,userObj)
  }

  login(userObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}authenticate`,userObj)
  }

  getUserDetails(accountnum:string){
    return this.http.get<any>(`${this.baseUrl}getByAccountNum/?accountnum=`+accountnum);
  }

  authlog(userObj:any,tokenString:string)
  {
    
    return this.http.post<any>(`${this.baseUrl}authenticate/2F?tokenentry=`+tokenString,userObj);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }


  getToken(){
    return localStorage.getItem('token');
  }

  isLogedIn():boolean{
    return !!localStorage.getItem('token')
  }

  signOut(){
    localStorage.clear();  
    this.router.navigate(["login"]);
  }
  
  decodedToken()
  {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getCustomerIdFromToken(){
     if(this.userPayload)
       return this.userPayload.nameid;
  }

  getAccountNumFromToken(){
    if(this.userPayload)
       return this.userPayload.actort;
  }

  getRoleFromToken(){
    if(this.userPayload)
       return this.userPayload.role;
  }
  }

