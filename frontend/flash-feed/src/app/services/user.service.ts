import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  registerDevice(deviceId: string) {
    return this.http.post(`${this.apiUrl}/api/v1/users/register`, null, {
      params: { deviceId }
    });
  }
}
