import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { NewsItem } from "../core/models/news.model";
import { SAMPLE_NEWS } from "./mock-news";
import { HttpClient } from "@angular/common/http";
import { LanguageService } from "./language.service";
import { User } from "../core/models/user.model";
import { environment } from "../../environments/environment";
import { DeviceService } from "./device.service";
import { Job } from "../core/models/jobs.model";
import { PreferenceService } from "./preference.service";
import { Capacitor } from "@capacitor/core";

@Injectable({ providedIn: 'root' })
export class NewsService {

    private apiUrl = `${environment.apiBaseUrl}`;
    private deviceId!: string;

    constructor(private httpClient: HttpClient, private languageService: LanguageService, private deviceService: DeviceService, private preferenceService: PreferenceService) { }

    setDeviceId(deviceId: string) {
        this.deviceId = deviceId;
    }

    getStory(scope: string): Observable<NewsItem[]> {
        const storyUrl = `${environment.apiBaseUrl}/api/v1/story?language=English BedTime Story`;
        //return this.httpClient.get(url, { responseType: 'text' });
        return this.httpClient.get<any>(storyUrl).pipe(
            map(response => {
                const articles = response || [];

                return articles.map((article: any): NewsItem => ({
                    id: article.id,
                    title: article.title || '',
                    imageUrl: article.imageUrl || this.extractImageFromEncoded(article.encoded),
                    summary: article.summary || '',
                    time: article.pubDate || '',
                    source: article.language || 'Unknown',
                    link: article.link || '',
                    important: false,
                    category: "",
                    language: "",
                    state: "",
                    country: "",
                    isLatest: false
                }));
            })
        );
    }

    getNewsByCategory(category: string): Observable<NewsItem[]> {

        let url = `${this.apiUrl}/api/v1/news/${category.toLowerCase()}`;

        if (Capacitor.isNativePlatform()) {

            if (this.deviceId) {
                url += `?deviceId=${this.deviceId}`;
            }

        } else {

            const state = localStorage.getItem('state');
            const language = localStorage.getItem('language');
            const country = localStorage.getItem('country');

            const params = [];

            if (state) params.push(`state=${state}`);
            if (language) params.push(`language=${language}`);
            if (country) params.push(`country=${country}`);
            params.push(`deviceId=`)

            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }
        }

        // 🔥 ADD THIS
        console.log('🚀 FINAL API URL:', url);
        console.log('📱 Device ID:', this.deviceId);

        return this.httpClient.get<any>(url).pipe(
            map(response => {
                const articles = response || [];
                return articles.map((article: any): NewsItem => ({
                    id: article.id,
                    title: article.title,
                    imageUrl: article.imageUrl || '',
                    summary: article.summary || '',
                    time: article.publishedAt || '',
                    source: article.source || 'Unknown',
                    important: false,
                    link: article.link || '',
                    category: article.category || '',
                    language: article.language || '',
                    state: article.state || '',
                    country: article.country || '',
                    isLatest: article.isLatest
                }));
            })
        );
    }

    getJobs(): Observable<Job[]> {
        return this.httpClient.get<Job[]>(`${this.apiUrl}/api/v1/jobs`);
    }

    private extractImageFromEncoded(encoded: string): string {
        if (!encoded) return '';
        const match = encoded.match(/<img[^>]+src="([^">]+)"/i);
        return match ? match[1] : '';
    }

    addNews(newsItem: NewsItem) {
        let addNewsUrl = `${this.apiUrl}/api/v1/news`;
        return this.httpClient.post<NewsItem>(addNewsUrl, newsItem, { headers: { 'Content-Type': 'application/json' } });
    }

    getUserDetails() {
        const userUrl = `${this.apiUrl}/api/v1/users/${this.deviceId}`;
        return this.httpClient.get<User>(userUrl);
    }

    updateUserlanguageDetails(language: string) {
        const userUrl = `${this.apiUrl}/api/v1/users/${this.deviceId}`;

        return this.httpClient.put<User>(
            userUrl,
            {}, // empty body
            {
                params: {
                    language: language
                }
            }
        );
    }

    updateUserDetails(language: string, country: string, state: string) {
        const userUrl = `${this.apiUrl}/api/v1/users/${this.deviceId}`;

        return this.httpClient.put<User>(
            userUrl,
            {}, // empty body
            {
                params: {
                    language: language,
                    country: country,
                    state: state
                }
            }
        );
    }

    deleteNews(id: number) {
        return this.httpClient.delete<void>(`${this.apiUrl}/api/v1/news/${id}`)
    }
}