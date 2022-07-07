import { Injectable } from '@angular/core';
import { Company } from '../Model/company';
import { CompanyDropdown } from '../Model/company-dropdown';
import {  
  HttpClient,  
  HttpResponse ,
  HttpHeaders 
} from '@angular/common/http';  
import { throwError, Observable } from 'rxjs';
import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  myAppUrl: string = "http://localhost:56561/api/v1.0/market";  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private companyList: Company[] = [];
  private companyDropDown : CompanyDropdown[] = [];
  constructor(private _http: HttpClient) { }

getCompany() {
    return this.companyList
}
getCompanyByID(id: string) {
  
  return this._http.get(this.myAppUrl + '/company/info/' + id);

}

saveCompany(company: Company) {  
  return this._http.post(this.myAppUrl + '/company/register', company).subscribe(data => {
    console.log(data);
  });

} 
removeUser(id: string) {
    this.companyList = this.companyList.filter(x => x.CompanyCode != id);
}
getCompanyDropDown() : Observable<CompanyDropdown[]>{  
  return this._http.get<CompanyDropdown[]>(this.myAppUrl + '/company/list');
}
}
