import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { NewsItem } from '../core/models/news.model';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Greeting } from '../greeting/greeting';

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
  selector: 'app-news',
  imports: [CommonModule, FormsModule, Greeting],
  templateUrl: './news.html',
  styleUrl: './news.scss'
})
export class News {

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
    this.preloadAllTabs();
  }

  ngAfterViewInit() {
    this.loadAds();
  }

  loadAds() {
    setTimeout(() => {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error('Ads error', e);
      }
    }, 500);
  }

  private preloadAllTabs(): void {

    const tabs: NewsTab[] = [
      'State',
      'National',
      'World',
      'Business',
      'Health',
      'Technology',
      'Entertainment'
    ];

    const requests: Record<NewsTab, Observable<NewsItem[]>> =
      {} as Record<NewsTab, Observable<NewsItem[]>>;

    tabs.forEach(tab => {
      requests[tab] = this.newsService.getNewsByCategory(tab);
    });

    forkJoin(requests).subscribe({
      next: (results) => {
        this.allNews = results;
        this.newsList = this.allNews[this.selectedTab];
        console.log('✅ All tabs preloaded');
      },
      error: (err) => console.error('❌ Preload failed', err)
    });
  }

  toggleTheme() {
    this.showDarkMode = !this.showDarkMode;
  }

  selectTab(tab: string) {
    if (this.selectedTab == tab) {
      return;
    }
    this.selectedTab = tab;
    //if (tab != 'Jobs') {
    this.newsList = this.allNews[tab];
    this.reloadTab(tab);
    //}

    this.loadAds();

    setTimeout(() => {
      const container = this.tabContainer?.nativeElement;
      const activeTab = container.querySelector('.tab.active');

      if (activeTab && container) {
        const offset = activeTab.offsetLeft - (container.offsetWidth / 2) + (activeTab.offsetWidth / 2);
        container.scrollTo({ left: offset, behaviour: 'smooth' });
      }
    });
  }

  reloadTab(tab: string): void {

    this.newsService.getNewsByCategory(tab).subscribe({
      next: (data) => {

        // Update cache
        this.allNews[tab] = data;

        // Update UI only if user is on this tab
        if (this.selectedTab === tab) {
          this.newsList = data;
        }

        console.log(`🔄 ${tab} refreshed`);
      },
      error: (err) => console.error(`❌ Reload failed for ${tab}`, err)
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  truncate(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  async openArticle(link: string) {
    // if (link) {
    //   window.open(link, '_blank');
    //   //window.location.href = link;
    // }
    if (Capacitor.isNativePlatform()) {
      Browser.open({ url: link });
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }

  openAddNews() {
    this.showAddNews = true;
  }

  addNews() {
    if (!this.newNews.title || !this.newNews.link) {
      console.error('New News title or link is empty');
      return;
    }

    const newsItem: NewsItem = {
      id: this.newNews.id,
      title: this.newNews.title,
      summary: this.newNews.summary,
      imageUrl: this.newNews.imageUrl,
      link: this.newNews.link,
      source: this.newNews.source,
      time: this.newNews.time,
      important: false,
      category: this.selectedTab,
      language: this.newNews.language,
      state: this.newNews.state,
      country: this.newNews.country
    }

    this.newsService.addNews(newsItem).subscribe({
      next: (savedNews: NewsItem) => {
        /*if (!this.allNews[this.selectedTab]) {
          this.allNews[this.selectedTab] = [];
        }

        this.allNews[this.selectedTab].unshift(savedNews);
        this.newsList = this.allNews[this.selectedTab];*/
        this.reloadTab(this.selectedTab);

        // clear form
        this.newNews = {
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

        this.showAddNews = false;
      },
      error: (err: any) => {
        console.error('Failed to save news', err);
      }
    })
  }

  updateNews(newsItem: NewsItem) {
    this.newNews = newsItem;
    this.showAddNews = true;
  }

  deleteNews(id: number) {
    this.newsService.deleteNews(id).subscribe({
      next: () => {
        //this.newsList = this.newsList.filter(n => Number(n.id) !== Number(id));
        console.log("Deleted " + id);
        this.reloadTab(this.selectedTab);
      },
      error: err => {
        console.error('Delete failed', err);
      }
    });
  }

}
