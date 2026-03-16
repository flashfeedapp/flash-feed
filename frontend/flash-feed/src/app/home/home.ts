import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news.service';
import { NewsItem } from '../core/models/news.model';
import { forkJoin, Observable } from 'rxjs';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { Greeting } from '../greeting/greeting';
import { Jobs } from '../jobs/jobs';
import { News } from '../news/news';

declare var adsbygoogle: any
type NewsTab =
  | 'State'
  | 'National'
  | 'World'
  | 'Business'
  | 'Health'
  | 'Technology'
  | 'Entertainment'

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  showDarkMode = false;
  tabs: string[] = [];
  selectedTab: string = 'State';
  showMoreTabs: boolean = false;
  newsList: NewsItem[] = [];


  showAddNews: boolean = false;
  isAdmin = true;

  newNews: any = {
    id: '',
    title: '',
    summary: '',
    imageUrl: '',
    link: '',
    source: '',
    time: '',
    category: '',
    language: '',
    state: '',
    country: ''
  };

  private allNews: { [key: string]: NewsItem[] } = {};

  @ViewChild('tabContainer') tabContainer !: ElementRef;

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {

    if (this.router.url === '/' || this.router.url === '/home') {
      this.router.navigate(['news']);
    }

  }

  submitNews() {
    this.router.navigate(['/submit']);
  }

  redirectToSettings() {
    this.router.navigate(['/settings'])
  }

  redirectToJobs() {
    this.router.navigate(['/jobs'])
  }

}
