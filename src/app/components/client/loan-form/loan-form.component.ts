import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserstoreService } from 'src/app/services/userstore.service';
import jsPDF from 'jspdf';
import { HTMLOptions } from 'jspdf';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})

export class LoanFormComponent {
  @ViewChild('htmlData', { static: false }) htmlData!: ElementRef;
  type: any;
  emptype: any;
  public loading = false;
  accountnumber: any;
  role: any;
  users: any = [];
  loans: any = [];
  

  constructor(private auth: AuthService, private userStore: UserstoreService, private api: ApiService,private router:Router,private toast:NgToastService) {

  }
  ngOnInit() {
    this.userStore.getAccountFromStore().subscribe(val => {
      let accountFromToken = this.auth.getAccountNumFromToken();
      this.accountnumber = val || accountFromToken;
    })

    this.auth.getUserDetails(this.accountnumber).subscribe(res => {
      this.users = res;
      this.emptype = this.users["empType"];
      console.log(this.users);
    });
    this.api.getLoanDetails(this.accountnumber).subscribe(res => {
      this.loans = res;
      console.log(this.loans);
      this.type = this.loans["loanType"];
    }
      , (err) => {
        console.log(err);
      })
      
  }

//Function to download file
  downloadPdf() {
    this.loading=true;
    const pdf = new jsPDF();
    const options: HTMLOptions = {
      html2canvas: { scale: 0.193,removeContainer:true},
      margin:[0,0,0,18],
      filename: `${this.accountnumber}loanApplication.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
    };
    const content = this.htmlData.nativeElement;
    pdf.html(content, options).save(`${this.accountnumber}loanApplication.pdf`).then(() => {
      const pdfBlob = pdf.output('blob');
      const formData = new FormData();
      formData.append('file', pdfBlob, options.filename);
      this.api.sendFile(formData).subscribe(res=>{
        this.loading = true;
        console.log(res);
        this.toast.success({detail:"Thank you",summary:"Loan Document has been sent to your registered Email-Id",sticky:true})
        this.router.navigate([""]);
      },err=>{
        this.loading = false;
        console.log(err);
      })
    });
  }


}




