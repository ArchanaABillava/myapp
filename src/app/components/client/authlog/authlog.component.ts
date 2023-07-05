import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-authlog',
  templateUrl: './authlog.component.html',
  styleUrls: ['./authlog.component.css']
})
export class AuthlogComponent {
  
  type:string = "password";
  isText:boolean = false;
  authLogForm! : FormGroup;
  eyeIcon: string = "fa-eye-slash"
  tokenotp :string =""
  customer:string = "";
  text :any = "";
  remainingTime:any;
  interval:any;
  minutes:any;
  seconds:any;


  constructor (private fb: FormBuilder,
    private auth:AuthService, 
    private router:Router, 
    private toast: NgToastService,
    private userStore:UserstoreService,
    private shared:SharedService
    )
  {
      this.shared.formData$.subscribe(data => {
        if(data){
          this.text = data;
        }
        else{
          this.toast.error({detail:"Error",summary:"Please Login Again",duration:3000})
          this.router.navigate(["login"]);
        }
      });
}

  ngOnInit():void {
     this.authLogForm = this.fb.group({
      customerid: [this.text,Validators.required],
      tokenotp:["",Validators.required]
     })
     this.startTimer();
  }

  OnChange(event:any){
    this.tokenotp = event.target.value;
  }
  OnChange2(event:any){
    this.customer = event.target.value;
  }

  startTimer() {
    const totalSeconds = 120;
    this.remainingTime = totalSeconds;
    this.interval = setInterval(() => {
    this.minutes = Math.floor(this.remainingTime / 60);
    this.seconds = this.remainingTime % 60;
    this.remainingTime--;
    if (this.remainingTime === 0) {
      if(this.auth.getToken() == null)
      {
        clearInterval(this.interval);
        window.location.reload();
        this.toast.error({detail:"Error",summary:"Otp expired Try Again",duration:3000})

         }

      }

    }, 1000);

 

  }

  
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text": this.type = "password";
    // return true;
  }

  onSubmit(){
   if(this.authLogForm.valid){
    console.log(this.authLogForm.value);
    console.log(this.tokenotp);
     this.auth.authlog(this.authLogForm.value,this.tokenotp).subscribe({next:(res)=>{
      this.auth.storeToken(res.token);
      const tokenPayload = this.auth.decodedToken();
      this.userStore.setAccountForStore(tokenPayload.actort);
      this.userStore.setRoleForStore(tokenPayload.role);
      this.userStore.setCustomerIdFromStore(tokenPayload.nameid);
      this.toast.success({detail:"Success",summary:res.message,duration:3000});
      this.router.navigate([""]);
     },
     error:(err)=>{
       console.log(err);
      this.toast.error({detail:"Error",summary:err.error.message,duration:3000})
     }
    
    })
   }
   else{
     this.validateAllfields(this.authLogForm);
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

  expiredOtp(){
    window.location.reload();
        // this.router.navigate(["login"]);
        this.toast.error({detail:"Error",summary:"Otp expired Try Again",duration:3000})
  }
    
  }

