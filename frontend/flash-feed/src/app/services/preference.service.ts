import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private apiUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private deviceService: DeviceService
  ) { }

  isMobile(): boolean {
    return Capacitor.isNativePlatform();
  }

  saveCountry(country: string) {

    if (this.isMobile()) {

      //const deviceId = this.deviceService.getStoredDeviceId();

      const deviceId = localStorage.getItem('deviceId');

      const url = `${this.apiUrl}/api/v1/users/` + deviceId;
      console.log("preferenceService url" + url);
      return this.http.put(url, {
        country: country
      });

    } else {

      localStorage.setItem('country', country);
      return null;
    }
  }

  saveState(state: string) {

    if (this.isMobile()) {

      //const deviceId = this.deviceService.getStoredDeviceId();
      const deviceId = localStorage.getItem('deviceId');
      const url = `${this.apiUrl}/api/v1/users/` + deviceId;
      console.log("preferenceService url" + url);
      return this.http.put(url, {
        state: state
      });

    } else {

      localStorage.setItem('state', state);
      return null;
    }
  }

  saveLanguage(language: string) {

    if (this.isMobile()) {

      //const deviceId = this.deviceService.getStoredDeviceId();
      const deviceId = localStorage.getItem('deviceId');
      const url = `${this.apiUrl}/api/v1/users/` + deviceId;
      console.log("preferenceService url" + url);
      return this.http.put(url, {
        language: language
      });

    } else {

      localStorage.setItem('language', language);
      return null;
    }
  }

  getState() {
    return localStorage.getItem('state');
  }

  getLanguage() {
    return localStorage.getItem('language');
  }

  getCountry() {
    return localStorage.getItem('country');
  }
}