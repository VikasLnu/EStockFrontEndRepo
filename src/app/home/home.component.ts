import {  
  Component,  
  Inject,
  OnInit  
} from '@angular/core'; 
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';  
import { StockService } from '../Services/stock.service';
import { CompanyService } from '../Services/company.service';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Stock } from '../Model/stock';
import {CompanyDropdown} from '../Model/company-dropdown'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

 stocksList: any; 
 companyDropdown : any; 
 selectedCompany : any;
 searchCompany: any;
 startdate : any;
 enddate : any;
 min : any;
 max : any;
 avg : any ;

    constructor( private __stockService: StockService,private __companyService: CompanyService) {   
    }  

    ngOnInit() {
      this.getData();
      this.getCompanyDropDown();   
      
    }

    getData(){
      this.__stockService.getAllStocks().subscribe((data: Stock[]) => {
      this.stocksList = data;   

      this.findMinMaxAvg(this.stocksList);
      });    
    }

    getCompanyDropDown()
    {
      this.__companyService.getCompanyDropDown().subscribe((data:CompanyDropdown[]) =>{
      this.companyDropdown = data;
    });
    }

    getStocksByCompany()
    {
      if(this.selectedCompany==undefined)
    {
      this.getData();
      
    }  
      else{
      this.__companyService.getCompanyByID(this.selectedCompany).subscribe((data:any) =>{
       
      this.stocksList = data.stocks;
      this.findMinMaxAvg(this.stocksList);
    });
    
    }
    }

    searchStocksByCompany(){
      this.__companyService.getCompanyByID(this.searchCompany).subscribe((data:any) =>{
      this.stocksList = data.stocks;
      });
    }

    filterByDate(){
      if(this.startdate != undefined || this.enddate != undefined){
        this.__stockService.getAllStocks().subscribe((data: any) => {
          this.stocksList = data.filter((x: { createdDate : string })=>x.createdDate.slice(0, 10) >= this.startdate && x.createdDate.slice(0, 10) <= this.enddate);                 
          });   
          this.findMinMaxAvg(this.stocksList);      
      }    
    }

    findMinMaxAvg(data:any){
      if(data.length > 0){
        let y: number[] = [];
        data.forEach((element: { price: any; }) => {
          y.push(element.price)
        });
        
        this.min = Math.min(... y);
        this.max = Math.max(... y);
        this.avg = (this.max / data.length).toFixed(2);
      }
      else{
        this.min = 0;
        this.max =0;
        this.avg = 0.0;
      }
      
    }
    
}
