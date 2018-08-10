import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Department} from '../Models/Departments';
import {AppConstants} from '../Shared/AppConstants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DepartmentsServiceService {

  private departmentURL = 'Departments';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    
    var url = AppConstants.ServerBaseURL + this.departmentURL;
    var data = this.http.get<Department[]>(url);
    return data;
  }

  saveDepartment(department : Department): Observable<Department>{
    var url = AppConstants.ServerBaseURL + this.departmentURL;
    return this.http.post<Department>(url,department);    
  }
}
