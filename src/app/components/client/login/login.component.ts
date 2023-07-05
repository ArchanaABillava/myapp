import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  type:string = "password";
  public loading = false;
  isText:boolean = false;
  loginForm! : FormGroup;
  eyeIcon: string = "fa-eye-slash"

  constructor (
    private fb: FormBuilder,
    private auth:AuthService, 
    private router:Router, 
    private toast: NgToastService,
    private shared:SharedService){
  }

  ngOnInit():void {
     this.loginForm = this.fb.group({
      //Validators for User Id and password
       customerid: ["",Validators.required],
       password:["",Validators.required]
     })
      this.loginForm.get('customerid')?.valueChanges.subscribe(value => {
        this.shared.updateFormData(value);
      });
     
         
  }
  
  //function to hide and show the password
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text": this.type = "password";
  }

  //function to nagivate to authentication page
  onSubmit(){
    if(this.loginForm.valid){
      this.loading = true;
      this.auth.login(this.loginForm.value).subscribe({next:(res)=>{
      this.router.navigate(["authlog"]);
     },
     error:(err)=>{
      this.loading = false;
      this.toast.error({detail:"Error",summary:err.error.message,duration:3000})
     }
    
    })
   }
   else{
     this.validateAllfields(this.loginForm);
   }
  }

  private validateAllfields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control?.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllfields(control);
      }
    })
  }
}
