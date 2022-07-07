import { Component, OnInit } from '@angular/core';
import {  
  NgForm,  
  FormBuilder,  
  FormGroup,  
  Validators,  
  FormControl  
} from '@angular/forms'; 

import { StockService } from '../Services/stock.service';
import { Stock } from '../Model/stock';
import { CompanyService } from '../Services/company.service';
import { CompanyDropdown } from '../Model/company-dropdown';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  companyForm: any; 
  companyDropdown : any;
  
  constructor(private _fb: FormBuilder, private _stockServices: StockService, private _companyServices: CompanyService) { }

  ngOnInit(): void {
    this.getCompanyDropDown();
    
    this.companyForm = this._fb.group({  
      price: new FormControl("",[Validators.required]),   
      selectedCompany: new FormControl("",[Validators.required])
      }); 
    
    
  }
  
  onFormSubmit() { 
    
if(this.companyForm.valid){
  
  this._stockServices.saveStock(this.companyForm.value,this.companyForm.value.selectedCompany);  
  this.companyForm.reset(); 
}
    
  } 

  getCompanyDropDown()
{
 this._companyServices.getCompanyDropDown().subscribe((data:CompanyDropdown[]) =>{
this.companyDropdown = data;
 });
}

}
