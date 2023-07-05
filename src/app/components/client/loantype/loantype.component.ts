import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loantype',
  templateUrl: './loantype.component.html',
  styleUrls: ['./loantype.component.css']
})

export class LoantypeComponent {
  constructor (private router: Router){
  }
  //function to navigate to different page
  routeToLoanForm(){
    this.router.navigate(["applyLoan"])
  }
  navigateToCalc(){
    this.router.navigate(["loancaltr"])

  }
}