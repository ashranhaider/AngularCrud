import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppConstants } from '../Shared/AppConstants';
import { HomeModel } from '../Models/Home';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  HomeURL: string = AppConstants.ServerBaseURL + 'GetHomeData';
  constructor(private http: HttpClient) { }

  getHomeData(): Observable<HomeModel[]> {
    return this.http.get<HomeModel[]>(this.HomeURL);
  }
}
