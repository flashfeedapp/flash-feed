import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { NewsItem } from '../core/models/news.model';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Share } from '@capacitor/share';

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
  imports: [CommonModule, FormsModule],
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
  isLoading: boolean = true;

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
    country: '',
    isLatest: false
  };

  private allNews: { [key: string]: NewsItem[] } = {};
  private tabScrollPositions: Record<string, number> = {};

  @ViewChild('tabContainer') tabContainer !: ElementRef;

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('userRole') == 'Admin';
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

    this.isLoading = true;
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
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('❌ Preload failed', err)
      }
    });
  }

  toggleTheme() {
    this.showDarkMode = !this.showDarkMode;
  }

  selectTab(tab: string) {
  if (this.selectedTab == tab) {
    return;
  }

  // save current scroll position
  const currentList = document.querySelector('.news-list') as HTMLElement | null;
  if (currentList) {
    this.tabScrollPositions[this.selectedTab] = currentList.scrollTop;
  }

  // switch tab
  this.selectedTab = tab;
  this.newsList = this.allNews[tab];
  this.reloadTab(tab);
  this.loadAds();

  // center active tab and restore saved scroll for the selected tab
  setTimeout(() => {
    const container = this.tabContainer?.nativeElement;
    const activeTab = container?.querySelector('.tab.active');

    if (activeTab && container) {
      const offset = activeTab.offsetLeft - (container.offsetWidth / 2) + (activeTab.offsetWidth / 2);
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }

    const list = document.querySelector('.news-list') as HTMLElement | null;
    if (list) {
      const pos = this.tabScrollPositions[tab] || 0;
      list.scrollTop = pos;
    }
  }, 0);
}

  reloadTab(tab: string): void {

    this.isLoading = true;
    this.newsService.getNewsByCategory(tab).subscribe({
      next: (data) => {

        // Update cache
        this.allNews[tab] = data;

        // Update UI only if user is on this tab
        if (this.selectedTab === tab) {
          this.newsList = data;
          setTimeout(() => {
  const list = document.querySelector('.news-list') as HTMLElement | null;
  if (list) {
    const pos = this.tabScrollPositions[tab] || 0;
    list.scrollTop = pos;
  }
}, 0);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(`❌ Reload failed for ${tab}`, err)
      }
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return '';
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const itemDayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayDiff = Math.floor((todayStart.getTime() - itemDayStart.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDiff === 0) {
      const diffMs = now.getTime() - d.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      if (hours > 0) {
        return `${hours}h`;
      }

      const minutes = Math.floor(diffMs / (1000 * 60));
      return minutes > 0 ? `${minutes}m` : 'Just now';
    }

    return `${dayDiff}d`;
  }

  truncate(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  async openArticle(link: string) {
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
      country: this.newNews.country,
      isLatest: this.newNews.isLatest
    }

    this.newsService.addNews(newsItem).subscribe({
      next: (savedNews: NewsItem) => {
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
          country: '',
          isLatest: false
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

  shareContent(item: any, event: Event) {
    event.stopPropagation();

    const text = `${item.title}

${this.truncate(item.summary, 120)}

Read more on News Bird 👇
https://play.google.com/store/apps/details?id=com.newsbird.app`;

    // ✅ Native app
    if (window && (window as any).Capacitor?.isNativePlatform?.()) {
      import('@capacitor/share').then(({ Share }) => {
        Share.share({
          title: 'Flash Feed',
          text: text
        });
      });
      return;
    }

    // ✅ Modern mobile browsers (HTTPS only)
    if (navigator.share) {
      navigator.share({
        title: 'Flash Feed',
        text: text
      }).catch(() => { });
    }
    // ✅ Final fallback (always works)
    else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied! Share anywhere 👍');
      }).catch(() => {
        alert(text); // worst case fallback
      });
    }
  }

}
