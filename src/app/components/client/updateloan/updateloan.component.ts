import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { updateValidators } from 'src/app/helpers/validate';
import { ApiService } from 'src/app/services/api.service';
import {Chart,registerables} from 'chart.js';


@Component({
  selector: 'app-updateloan',
  templateUrl: './updateloan.component.html',
  styleUrls: ['./updateloan.component.css']
})
export class UpdateloanComponent {
  loanId:any;
  updateLoanForm!:FormGroup;
  loanDetailsObj: any;
  isDisabled: boolean = true;
  formData: any = {};
  fName:any;
  commentForm!: FormGroup;
  accountNum:any;
  fpath:any;
  interest: any;
  type: any;
  empType:any;
  loantypes: any;
  selectedFiles!: File[];
  files: File[] = [];
  loanStatus:any;
  availableEmi:number=0;
  loanEmi:number=0;

  totalAmount:number=0;
  tenure:any;
  
  totalAvailableAmount:any;
  selectedFile: string = '';
  color:string = '';
  myChart!: Chart;
  selectedLoanPurpose: string = '';                                     
  
  ngAfterViewInit() {
    this.createChart();
  }


  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService, private router: Router, private api: ApiService,private datePipe: DatePipe) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loanId = params['id'];
      this.getLoanDetails();
    });
    this.updateLoanForm = this.formBuilder.group({
      accountNum: [this.accountNum, Validators.required],
      loanType: [this.type, Validators.required],
      interest:[this.interest],
      loanAmount: ['', [Validators.required, Validators.pattern('^(?!0)[0-9]*$')]],
      tenure: ['', Validators.required],
      annualIncome: ['', [Validators.required, Validators.pattern('^(?!0)[0-9]*$')]],
      otherEmi: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      loanPurpose: ['', Validators.required],
      propertyLoc: ['',],
      propertyArea: ['',],
      propertyValue: ['',],
      ongoingLoan: [''],
      vehicleType: [''],
      vehicleRCNumber: [''],
      vehiclePrice: [''],
      vendorName: [''],
      vendorAddress: [''],
      educationType: [''],
      courseName: [''],
      courseDuration: [''],
      instituteName: [''],
      totalFee: [''],
      loanStatus:[this.loanStatus],

    });

    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
    });


  

    this.updateLoanForm.controls['loanType'].valueChanges.subscribe(value => {
      this.loantypes = value;
      updateValidators(this.updateLoanForm, this.loantypes)
    });
  }

  createChart() {
    Chart.register(...registerables); // Register all modules

    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }

    const chartData = {
      labels: ['Loan-EMI', 'Available-EMI'],
      datasets: [{
        label: 'EMIs',
        data: [this.loanEmi,this.availableEmi],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          
        
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
      
          
        ],
        borderWidth: 1
      }]
    };

    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true
          }
        }
      }
    });
  }

  onFileSelected(event: any): void {
    this.files = event.target.files;
  }

  getLoanDetails() {
    this.api.getLoanDetailsById(this.loanId).subscribe((response: any) => {
      this.loanDetailsObj = response;
      this.type = this.loanDetailsObj.loanDetails["loanType"]
      this.accountNum = this.loanDetailsObj.loanDetails["accountNum"]
      this.empType = this.loanDetailsObj.customerAccountInfo["empType"]
      this.loanStatus = this.loanDetailsObj.customerAccountInfo["loanStatus"]
    
      this.fName=this.loanDetailsObj.document.fileName.split(',');

      this.fpath=this.loanDetailsObj.document.filePath.split(',');
      console.log(this.empType);
      this.selectedLoanPurpose = this.loanDetailsObj.loanDetails["loanPurpose"]
      this.interest = this.loanDetailsObj.loanDetails["interest"]


      const otherEmi = this.loanDetailsObj.loanDetails.otherEmi;
      this.loanEmi = this.loanDetailsObj.loanDetails.loanEmi;
      this.loanStatus = this.loanDetailsObj.loanDetails.loanStatus;
      this.totalAmount = this.loanDetailsObj.loanDetails.loanAmount;
      this.tenure = this.loanDetailsObj.loanDetails.tenure;
      this.interest = this.loanDetailsObj.loanDetails.interest;


      const annualIncome =this.loanDetailsObj.loanDetails.annualIncome;
      const monthlyIncome=this.loanDetailsObj.loanDetails.monthlyIncome ;
      const monthemi =(monthlyIncome/2) ;
      const annualemi=(annualIncome/24);
      const avgemi=(monthemi+annualemi)/2;
      this.availableEmi=Math.round(avgemi - otherEmi);


      const monthlyInterestRate = (this.interest / 12) / 100;
      this.totalAvailableAmount = (this.availableEmi / monthlyInterestRate) * (Math.pow(1 + monthlyInterestRate, this.tenure) - 1);


      console.log(this.loanDetailsObj);
      for (const controlName in this.updateLoanForm.controls) {
        if (this.loanDetailsObj.loanDetails.hasOwnProperty(controlName)) {
          this.updateLoanForm.controls[controlName].setValue(this.loanDetailsObj.loanDetails[controlName]);
        }
      }

    },
      error => {
        console.log(error);
      }
    );
  }

  deleteFile(file:string)
  { 
    this.http.put(`https://localhost:7080/api/Files/deleteFile?fileName=${file}&loanId=${this.loanId}`,file,this.loanId).subscribe(res => {
      this.toast.error({ detail: 'Deleted', summary: "File removed Successfully", duration: 5000 });
      console.log(res);
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
    })
      
  }

     onSubmit() {
    if (this.updateLoanForm.valid) {

      console.log(this.updateLoanForm.value);

      this.http.put(`https://localhost:7080/api/Loan/updateLoan?loanid=${this.loanId}`,this.updateLoanForm.value).subscribe(res => {
        this.toast.success({ detail: 'Success', summary: "Loan Updated Successfully", duration: 5000 });
        console.log(res);
      }, (err: any) => {
        console.log(err);
      })

    } else {
      this.updateLoanForm.markAllAsTouched();
    }
  }


onFileUpload() {

    const formData = new FormData();

    formData.append('loanId', this.loanId);
    for (const file of this.files) {
      // formData.append('accountNumber', this.accountNum);
      // formData.append('loanType', this.type);
      formData.append('files', file);
    }

    console.log('FormData', formData);

    formData.forEach((value, key) => {
      console.log(key + ':', value);
    });

   

    this.api.uploadFile(formData).subscribe(
      (response) => {
        this.toast.success({ detail: "Files updated successfully" });
        console.log('Files uploaded successfully:', response);
        this.ngOnInit();
      },
      (error) => {
        this.toast.error({ detail: "Failed to update files" });
        console.error('Error uploading files:', error);
      }
    );
  }


  updateLoanStatus(status: string) {
    if (this.commentForm.valid) {
      const payload = {
        Id: this.loanDetailsObj.loanDetails.loanId,
        status: status,
        comment: this.commentForm.get('comment')?.value,

      };

      this.api.updateLoanStatus(payload).subscribe(
        (response) => {
          this.toast.success({ detail: "Loan status updated successfully" });
          console.log('Loan status updated successfully.');

          this.loanDetailsObj.loanDetails.loanStatus = status;
          this.loanDetailsObj.loanDetails.comment = this.commentForm.get('comment')?.value;

          this.router.navigate(['allLoans']);
        },
        error => {
          this.toast.error({ detail: "Failed to update loan status" });
          console.log('Failed to update loan status.');
          console.log(error);
        }
      );
    }

    else {
      
      this.toast.info({ detail: "Please provide feedback"});

    }

  }

}
