import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DeviceService } from './device.service';
import { Observable, of } from 'rxjs';

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

      const deviceId = localStorage.getItem('deviceId');

      const url = `${this.apiUrl}/api/v1/users/` + deviceId;
      console.log("preferenceService url" + url);
      return this.http.put(url, null, {
        params: {
          country: country
        }
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
      return this.http.put(url, null, {
        params: {
          state: state
        }
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
      return this.http.put(url, null, {
        params: {
          language: language
        }
      });

    } else {

      localStorage.setItem('language', language);
      return null;
    }
  }

  saveUserDetails(data: any): Observable<any> {
    console.log('🔥 saveUserDetails called');
    console.log('📦 Payload:', data);

    if (this.isMobile()) {

      const deviceId = localStorage.getItem('deviceId');

      console.log('📱 Mobile Platform');
      console.log('🆔 DeviceId:', deviceId);

      const url = `${this.apiUrl}/api/v1/users/${deviceId}`;

      console.log('🌐 API URL:', url);
      console.log('📨 Sending Params:', {
        language: data.language,
        country: data.country,
        state: data.state
      });

      return this.http.put(url, null, {
        params: {
          language: data.language || '',
          country: data.country || '',
          state: data.state || ''
        }
      });

    } else {

      console.log('💻 Browser Mode - Saving to localStorage');

      localStorage.setItem('language', data.language || '');
      localStorage.setItem('state', data.state || '');
      localStorage.setItem('country', data.country || '');

      console.log('✅ Saved Browser Values:', {
        language: localStorage.getItem('language'),
        state: localStorage.getItem('state'),
        country: localStorage.getItem('country')
      });

      return of({ success: true });
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