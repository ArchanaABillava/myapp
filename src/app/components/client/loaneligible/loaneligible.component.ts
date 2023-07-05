import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { maxValueValidator } from 'src/app/helpers/validate';

@Component({
  selector: 'app-loaneligible',
  templateUrl: './loaneligible.component.html',
  styleUrls: ['./loaneligible.component.css']
})

export class LoaneligibleComponent {
  loanEligible!: FormGroup;
  interest: any;
  type: any;
  color!: string;
  result: any;
  conclusionA: any;
  conclusionB: any;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,private router:Router,private toast:NgToastService
  ) { }

  ngOnInit() {
    this.loanEligible = this.formBuilder.group({
      //Validators for input fields
      loanType: ['', Validators.required],
      loanAmount: ['', [Validators.required,Validators.pattern('^(?!0)[0-9]*$'),maxValueValidator(10000,10000000)]],
      tenure: ['', Validators.required],
      annualIncome: ['', [Validators.required,Validators.pattern('^(?!0)[0-9]*$'),maxValueValidator(25000,10000000)]],
      otherEmi: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
    });
  }

  onChange(event: any) {
    const target = event.target as HTMLInputElement;
    const name = target.getAttribute('formControlName');
    this.type = target.value;
    console.log(name);
  
    //To fetch interest rate based on loan type
    if (name == "loanType") {
      console.log(target.value)
      this.api.getInterestByLoanType(target.value).subscribe(
        (interest: number) => {
          this.interest = interest;
          console.log(interest);
        },
        (error: any) => {
          console.error(error);
        }
      );
    } 
  }

  //Function to calculate Loan EMI and Available EMI on click 
  onSubmit() {
    this.result = document.getElementById("app") as HTMLElement;
    this.conclusionA = document.getElementById("resulta") as HTMLElement;
    this.conclusionB = document.getElementById("resultb") as HTMLElement;
    if (this.loanEligible.valid) {
      console.log(this.loanEligible.value);
      this.api.checkEligible(this.loanEligible.value).subscribe(res => {
        this.result.innerHTML = res["results"]
        this.conclusionA.innerHTML = res["availableEMI"]
        this.conclusionB.innerHTML = res["loanEMI"]
        this.color = res["color"]
      }, (err: any) => {
        console.log(err);
        this.toast.error({detail:"Error",summary:err.error.message,duration:3000})
      })

    } else {
      this.loanEligible.markAllAsTouched();
    }
  }
}