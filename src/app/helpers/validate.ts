import { Validators,AbstractControl, ValidatorFn, } from "@angular/forms";

export function updateValidators(loanBasic:any,loantypes:any){
    
    const propArea = loanBasic.controls['propertyArea']; 
    const propLoc = loanBasic.controls['propertyLoc']; 
    const propVal = loanBasic.controls['propertyValue']; 
    const ongoingLoan = loanBasic.controls['ongoingLoan']; 
    const vehicleType = loanBasic.controls['vehicleType']; 
    const vehiclercNumber = loanBasic.controls['vehiclercNumber']; 
    const vehiclePrice = loanBasic.controls['vehiclePrice']; 
    const vendorName = loanBasic.controls['vendorName']; 
    const vendorAddress = loanBasic.controls['vendorAddress']; 
    const educationType = loanBasic.controls['educationType']; 
    const totalFee = loanBasic.controls['totalFee']; 
    const instituteName = loanBasic.controls['instituteName']; 
    const courseDuration = loanBasic.controls['courseDuration']; 
    const courseName = loanBasic.controls['courseName']; 

    if(loantypes == 'houseLoan'){
      propArea.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);
      propLoc.setValidators(Validators.required);
      propVal.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);   
    }
    else if(loantypes == 'personalLoan')
    {
            propArea.clearValidators();
            propLoc.clearValidators();
            propVal.clearValidators();
            ongoingLoan.setValidators([Validators.required]);
    }
    else if(loantypes == 'vehicleLoan')
    {
      propArea.clearValidators();
      propLoc.clearValidators();
      propVal.clearValidators();
      ongoingLoan.clearValidators();
      vehiclePrice.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);
      vehicleType.setValidators(Validators.required);
      vendorName.setValidators([Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]);
      vendorAddress.setValidators(Validators.required);
      vehiclercNumber.setValidators([Validators.required]);  
    }
    else if(loantypes == 'educationLoan')
    {
      propArea.clearValidators();
      propLoc.clearValidators();
      propVal.clearValidators();
      ongoingLoan.clearValidators();
      vehiclePrice.clearValidators();
      vehicleType.clearValidators();
      vendorName.clearValidators();
      vendorAddress.clearValidators();
      vehiclercNumber.clearValidators(); 
      totalFee.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$'),maxValueValidator(10000,1000000)]);
      instituteName.setValidators(Validators.required);
      courseName.setValidators([Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]);
      educationType.setValidators(Validators.required);
      courseDuration.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$'),maxValueValidator(1,10)]); 

    }

    propArea.updateValueAndValidity();
    propVal.updateValueAndValidity();
    propLoc.updateValueAndValidity();
    ongoingLoan.updateValueAndValidity();
    vehiclePrice.updateValueAndValidity();
    vehicleType.updateValueAndValidity();
    vendorName.updateValueAndValidity();
    vendorAddress.updateValueAndValidity();
    vehiclercNumber.updateValueAndValidity();
    courseDuration.updateValueAndValidity();
    courseName.updateValueAndValidity();
    instituteName.updateValueAndValidity();
    educationType.updateValueAndValidity();
    totalFee.updateValueAndValidity();
  }
  export function maxValueValidator( minValue : number ,maxValue: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = parseInt(control.value, 10);

      if (isNaN(value) || value > maxValue || value < minValue) {
        return { maxValue: { valid: false } };
      }

      return null;
    };
  }

