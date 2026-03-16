import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly STORAGE_KEY = 'flashfeed_device_id';

  constructor() { }

  async getDeviceId(): Promise<string> {

    if (Capacitor.isNativePlatform()) {
      return await this.getOrCreateNativeId();
    } else {
      return this.getOrCreateWebId();
    }
  }

  private async getOrCreateNativeId(): Promise<string> {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });

    if (value) return value;

    const newId = uuidv4();

    await Preferences.set({
      key: this.STORAGE_KEY,
      value: newId
    });

    return newId;
  }

  private getOrCreateWebId(): string {
    let id = localStorage.getItem(this.STORAGE_KEY);

    if (id) return id;

    id = uuidv4();
    localStorage.setItem(this.STORAGE_KEY, id);

    return id;
  }

  getStoredDeviceId(): string | null {
    return localStorage.getItem('deviceId');
  }
}