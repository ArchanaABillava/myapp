import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserstoreService } from 'src/app/services/userstore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public users: any = [];
  public role!:string;
  public accountnumber!:string;
  public cust_name! : string;
  public fullName: string = "";
  LoanArray:any = [];
  isResultLoaded:boolean = false;

  constructor(private auth: AuthService, private api: ApiService, private userStore: UserstoreService,private router: Router) { }

  ngOnInit() {
    this.userStore.getCustomerIdFromStore()
      .subscribe(val => {
        let fullNamefromToken = this.auth.getCustomerIdFromToken();
        this.fullName = val || fullNamefromToken;
      });
    this.userStore.getRoleFromStore().subscribe(val => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
    this.userStore.getAccountFromStore().subscribe(val => {
      let accountFromToken = this.auth.getAccountNumFromToken();
      this.accountnumber = val || accountFromToken;
    })
    if(this.role == "user")
    {
      this.auth.getUserDetails(this.accountnumber).subscribe(res => {
        this.users = res;
        this.cust_name = this.users["userName"]
        console.log(this.users);
      });
      const loanObservable: Observable<any> = this.api.getLoanStatusDetails(this.accountnumber)
      loanObservable.subscribe((resultData: any) => {
        this.isResultLoaded = true;
       this.LoanArray = resultData;
         console.log(resultData);  
      });
    }
  }
  signOut() {
    this.auth.signOut();
  }
  navigateToCalc(){
    this.router.navigate(["loancaltr"])

  }

}
