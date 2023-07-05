import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/client/login/login.component';
import { SignupComponent } from './components/client/signup/signup.component';
import { HomeComponent } from './components/client/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoaneligibleComponent } from './components/client/loaneligible/loaneligible.component';
import { AuthlogComponent } from './components/client/authlog/authlog.component';
import { LoandetailsComponent } from './components/client/loandetails/loandetails.component';
import { LoanFormComponent } from './components/client/loan-form/loan-form.component';
import { LoancaltrComponent } from './components/client/loancaltr/loancaltr.component';
import { LoantypeComponent } from './components/client/loantype/loantype.component';
import { RouteGuardGuard } from './guards/route-guard.guard';
import { LoanreqComponent } from './components/admin/loanreq/loanreq.component';
import { AllloansComponent } from './components/admin/allloans/allloans.component';
import { UpdateloanComponent } from './components/client/updateloan/updateloan.component';




const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'loaneligible',component:LoaneligibleComponent},
  {path:'authlog',component:AuthlogComponent},
  {path:'applyLoan',component:LoandetailsComponent},
  {path:'loancaltr',component:LoancaltrComponent},
  {path:'loantype',component:LoantypeComponent},
  {path:'allLoans',component:AllloansComponent},
  {path:'allLoans/:id',component:LoanreqComponent},
  {path:'loanForm',component:LoanFormComponent},
  {path:"",component:HomeComponent,canActivate:[AuthGuard]},
  {path:'update/:id',component:UpdateloanComponent},
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{
    scrollPositionRestoration:'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
