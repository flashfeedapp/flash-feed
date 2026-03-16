import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { GreetingModel } from "../core/models/greeting.model";

@Injectable({ providedIn: 'root' })
export class GreetingService {

  private baseUrl = environment.apiBaseUrl + '/api/v1/greetings';

  constructor(private http: HttpClient) {}

  getActiveGreeting() {
    return this.http.get<GreetingModel>(`${this.baseUrl}/active`);
  }

  createGreeting(greeting: GreetingModel) {
    return this.http.post<GreetingModel>(`${this.baseUrl}/admin`, greeting);
  }

  deactivateAll() {
    return this.http.put(`${this.baseUrl}/admin/deactivate`, {});
  }
}