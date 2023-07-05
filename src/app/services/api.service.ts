import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = "https://localhost:7080/api/Loan/";
  private loandetailsUrl : string = "https://localhost:7080/api/LoanDetails/"
  private fileurl = "https://localhost:7080/api/Files";
  private checkurl = "https://localhost:7080/api/LoanEligible/checkEligible";
  private calciUrl="https://localhost:7080/api/LoanCalculator/calculateEMI";

  constructor(private http:HttpClient) { }

  getInterestByLoanType(loanType: string): Observable<number> {
    const url = `${this.baseUrl}getInterest?loanType=${loanType}`; 
    return this.http.get<number>(url);
  }

  getLoanDetailsById(id:any){
    const url = `${this.loandetailsUrl}${id}`;
    return this.http.get<any>(url);
  }

  updateLoanStatus(payload:any){
    const url = `${this.baseUrl}status`; 
    return this.http.put<any>(url,payload);
  }

  applyLoan(loanObj:any){
    const url = `${this.baseUrl}applyLoan`;
    return this.http.post<any>(url,loanObj);
    
  }

  checkEligible(checkObJ:any){
    return this.http.post<any>(this.checkurl,checkObJ);
  }
  calculateEMI(calObJ:any){
    return this.http.post<any>(this.calciUrl,calObJ);
  }

  uploadFile(formData:any){
    return this.http.post<any>(this.fileurl,formData);
  }
  sendFile(formData:any){
    return this.http.post<any>(`${this.fileurl}/sendFile`,formData);
  }
  
  getLoanDetails(accountnum:string){
    const url = `${this.baseUrl}getLoanByAccountNum?accountnum=${accountnum}`; 
    return this.http.get<any>(url);
  }
  getLoanStatusDetails(accountnum:string){
    const url = `${this.baseUrl}getLoanStatusByAccountNum?accountnum=${accountnum}`; 
    return this.http.get<any>(url);
  }

  getAllLoans(){
     return this.http.get<any>(`${this.baseUrl}getAllLoans`)
    }
    
getAllAckLoans(){
      
      return this.http.get<any>(`${this.baseUrl}getAllAckLoans`)
  }

  getSearchResults(params:any){
    const url = `${this.loandetailsUrl}search/?${params}`;
    return this.http.get<any>(url);
  }

  deleteFile(loanId:any,file:any)
  {
    const url =  `${this.fileurl}/deleteFile?fileName=${file}&loanId=${loanId}`;
    return this.http.put<any>(url,file,loanId);
  }
  
}
