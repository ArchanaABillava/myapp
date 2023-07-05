import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/client/login/login.component';
import { SignupComponent } from './components/client/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { HomeComponent } from './components/client/home/home.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoaneligibleComponent } from './components/client/loaneligible/loaneligible.component';
import { AuthlogComponent } from './components/client/authlog/authlog.component';
import { NgxLoadingModule } from "ngx-loading";
import { LoandetailsComponent } from './components/client/loandetails/loandetails.component';
import { LoanFormComponent } from './components/client/loan-form/loan-form.component';
import { NavbarComponent } from './components/client/navbar/navbar.component';
import { LoancaltrComponent } from './components/client/loancaltr/loancaltr.component';
import { LoantypeComponent } from './components/client/loantype/loantype.component';
import { LoanreqComponent } from './components/admin/loanreq/loanreq.component';
import { AllloansComponent } from './components/admin/allloans/allloans.component';
import { FooterComponent } from './components/client/footer/footer.component';
import { UpdateloanComponent } from './components/client/updateloan/updateloan.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LoaneligibleComponent,
    AuthlogComponent,
    LoandetailsComponent,
    LoanFormComponent,
    NavbarComponent,
    LoancaltrComponent,
    LoantypeComponent,
    LoanreqComponent,
    AllloansComponent,
    FooterComponent,
    UpdateloanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgToastModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  },
  DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
