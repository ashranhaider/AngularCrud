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

  private departmentURL = AppConstants.ServerBaseURL + 'Departments';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentURL);
  }

  saveDepartment(department: Department): Observable<Department> {

    return this.http.post<Department>(this.departmentURL, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(this.departmentURL + '/' + department.ID, department);
  }
  deleteDepartment(departmentID: Number): Observable<Department> {
    return this.http.delete<Department>(this.departmentURL + '/' + departmentID);
  }

}
