import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../Services/company.service';
import {  
  NgForm,  
  FormBuilder,  
  FormGroup,  
  Validators,  
  FormControl  
} from '@angular/forms'; 
import { Company } from '../Model/company';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  dataSaved = false;  
  companyForm: any;  
  errorMessage: any;  
  massage = null;  
  exchangeDropdown : string[] = ["NSE","BSE"];

  constructor(private _fb: FormBuilder, private _companyService: CompanyService) { }

  ngOnInit() {
  
  this.companyForm = this._fb.group({  
      comapanyName: new FormControl("",[Validators.required]),  
      companyCEO: new FormControl("",[Validators.required]),        
      companyWebsite: new FormControl("",[Validators.required]),  
      exchange:new FormControl("",[Validators.required]),  
      companyTurnover: new FormControl("",[Validators.required,Validators.min(10)]) 
    });
   
  }
  
  onFormSubmit() {  

if(this.companyForm.valid)
    this._companyService.saveCompany(this.companyForm.value);  
    this.companyForm.reset();  
  } 
}
