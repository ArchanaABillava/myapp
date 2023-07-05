import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSubMenuOpen = false;
  public users: any = [];
  public role!:string;
  public accountnumber!:string;
  public cust_name! : string;
  public fullName: string = "";
  public username:string="";
  public initials: string="";
  isResultLoaded:any;
  LoanArray:any;
  count:any;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  constructor(private router: Router,private auth: AuthService, private api: ApiService, private userStore: UserstoreService,) { }
 
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
        this.initials =this.cust_name.charAt(0).toUpperCase();
        console.log(this.users);
      });
    }
    if(this.role == "admin")
    {
      
      this.initials =this.fullName.charAt(0).toUpperCase();
      const loanObservable: Observable<any> = this.api.getAllLoans();
      loanObservable.subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.LoanArray = resultData;
        this.count = resultData.length;
        console.log(this.count);
      });
    }
}

signOut() {
  this.auth.signOut();
}

routetoallLoans(){
  this.router.navigate(["allLoans"])
}

routetoLoanType(){
  this.router.navigate(["loantype"])
}
}