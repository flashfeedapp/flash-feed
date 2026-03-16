import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from './core/models/user.model';
import { NewsService } from './services/news.service';
import { DeviceService } from './services/device.service';
import { UserService } from './services/user.service';
import { Capacitor } from '@capacitor/core';
import { News } from './news/news';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('flash-feed');
  showDarkMode = false;
  showBottomNav = false;
  selectedTab: string = 'News';
  showSplash = true;

  constructor(private router: Router, private newsService: NewsService, private deviceService: DeviceService, private userService: UserService) { }

  async ngOnInit() {

    // Show splash for 1.8 seconds
    setTimeout(async () => {

      this.showSplash = false;

      if (Capacitor.isNativePlatform()) {

        const deviceId = await this.deviceService.getDeviceId();

        this.newsService.setDeviceId(deviceId);

        this.userService.registerDevice(deviceId).subscribe({
          next: (user: any) => {

            if (!user.state || !user.language || !user.country) {
              this.redirectToPreferences();
            } else {
              this.redirectToHome();
            }

          },
          error: err => console.error(err)
        });

      } else {

        const state = localStorage.getItem('state');
        const language = localStorage.getItem('language');
        const country = localStorage.getItem('country');

        if (!state || !language || !country) {
          this.redirectToPreferences();
        } else {
          this.redirectToHome();
        }

      }

    }, 1800);

  }

  toggleTheme() {
    this.showDarkMode = !this.showDarkMode;
  }

  submitNews() {
    this.router.navigate(['/submit']);
  }

  redirectToHome() {
    this.router.navigate(['/home'])
  }

  redirectToSettings() {
    this.router.navigate(['/settings'])
  }

  redirectToNewsVideos() {
    this.router.navigate(['/news-videos'])
  }

  redirectToStories() {
    this.router.navigate(['/stories'])
  }

  redirectToPreferences() {
    this.router.navigate(['/preferences'])
  }

  navigateAndClose(route: string) {
    this.showBottomNav = false;
    this.router.navigate([route]);
  }

  toggleBottomNav() {
    this.showBottomNav = !this.showBottomNav;
  }

  selectTab(tab: string) {
    if (this.selectedTab == tab) {
      return;
    }
    this.selectedTab = tab;
  }

}
