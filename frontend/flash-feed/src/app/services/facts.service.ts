import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facts } from '../facts/facts';
import { environment } from '../../environments/environment';
import { Fact } from '../core/models/facts.model';

@Injectable({
  providedIn: 'root'
})
export class FactService {

  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http:HttpClient) {}

  getFacts():Observable<Fact[]>{
    return this.http.get<Fact[]>(`${this.apiUrl}/api/v1/facts`);
  }

}