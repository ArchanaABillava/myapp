import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  type:string = "password"
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash"
  signupForm!: FormGroup;
  public loading = false;
  

  constructor (private fb:FormBuilder,private auth:AuthService,private router:Router,private toast:NgToastService){}

  ngOnInit():void {
    this.signupForm = this.fb.group({
      //adding validations to fields
      userName : ["",[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]],
      accountNum : ["",[Validators.required,Validators.pattern(/^[^\s]+$/)]],
      email : ["",[Validators.required,Validators.pattern(/^[^\s]+$/)]],
      contactNum : ["",[Validators.required,Validators.pattern(/^[^\s]+$/)]],
      password:["",Validators.required],
      customerid:["",[Validators.required,Validators.pattern(/^[^\s]*$/)]]
    })
 }

 get f(){return this.signupForm.controls};

 //Password hide and show function
 hideShowPass(){
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText ? this.type = "text": this.type = "password";
}

 onSubmit(){
  if(this.signupForm.valid){
     this.loading = true;
      console.log(this.signupForm);
       this.auth.signUp(   {
        "userReg": {
        "password": this.signupForm.value.password,
        "customerId" : this.signupForm.value.customerid
         
        },
        "custObj": {
           "userName":this.signupForm.value.userName,
           "email": this.signupForm.value.email,
           "accountNum": this.signupForm.value.accountNum,
           "contactNum":this.signupForm.value.contactNum
        }
      })
       
       .subscribe({next:(res=>
        {
        this.toast.success({detail:"Success",summary:res.message,duration:5000});
        this.signupForm.reset();
        this.router.navigate(['login']);
      }),
       error:(err=>{
        this.loading = false;
        console.log(err);
        this.toast.error({detail:"Error",summary:err.error.message,duration:5000})
       })
      
      })
  }
  else{
    this.validateAllfields(this.signupForm);
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

