import { Injectable,Inject } from '@angular/core';
import {  
  HttpClient,  
  HttpResponse ,
  HttpHeaders 
} from '@angular/common/http';  
import { throwError, Observable } from 'rxjs';

import {  
  Router  
} from '@angular/router';  

import { Stock } from '../Model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  myAppUrl: string = "http://localhost:56561/api/v1.0/market";  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private _http: HttpClient) {  
   }
  
getAllStocks(): Observable<Stock[]> {  
  return this._http.get<Stock[]>(this.myAppUrl + '/stock/getall');  
}
 getStockId(companyCode: string) {  
    return this._http.get(this.myAppUrl + '/company/info/' + companyCode);
}    

saveStock(employee: Stock,id : string) {  
  console.log(this.myAppUrl + '/stock/add/'+id);
     return this._http.post(this.myAppUrl + '/stock/add/'+id, employee).subscribe(data => {
    });

}  

}
