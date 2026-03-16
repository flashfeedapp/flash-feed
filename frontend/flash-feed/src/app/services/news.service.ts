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
                    country: ""
                }));
            })
        );
    }

    /*getNewsByCategory(category: string): Observable<NewsItem[]> {
        const url = `${this.apiUrl}/api/v1/news/${category.toLowerCase()}`;
        return this.httpClient.get<any>(url, {
            params: {
                deviceId: this.deviceId
            }
        }).pipe(
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
                    country: article.country || ''
                }));
            })
        );
    }*/

    getNewsByCategory(category: string): Observable<NewsItem[]> {

        let url = `${this.apiUrl}/api/v1/news/${category.toLowerCase()}`;

        if (Capacitor.isNativePlatform()) {

            const deviceId = localStorage.getItem('deviceId');

            if (deviceId) {
                url += `?deviceId=${deviceId}`;
            }

        } else {

            const state = localStorage.getItem('state');
            const language = localStorage.getItem('language');
            const country = localStorage.getItem('country');

            const params = [];

            if (state) params.push(`state=${state}`);
            if (language) params.push(`language=${language}`);
            if (country) params.push(`country=${country}`);
            this.deviceId = '';

            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }
        }

        return this.httpClient.get<any>(url, {
            params: {
                deviceId: this.deviceId
            }
        }).pipe(
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
                    country: article.country || ''
                }));
            })
        );
    }

    getJobs(): Observable<Job[]> {
        return this.httpClient.get<Job[]>(`${this.apiUrl}/api/v1/jobs`);
    }


    /*getNews(scope: string): Observable<NewsItem[]> {
        //let filteredNews = SAMPLE_NEWS;
        //return of(filteredNews);

        const url = `${this.apiUrl}`;
        return this.httpClient.get<any>(url).pipe(
            map(response => {
                const articles = response.results || [];

                // ✅ Return the result of map
                return articles.map((article: any): NewsItem => ({
                    id: article.id,
                    title: article.title,
                    imageUrl: article.image_url || '', // fix: use actual image field if available
                    summary: article.description || '',
                    time: article.pubDate || '',
                    source: article.source_name || 'Unknown',
                    link: article.link,
                    important: false,
                    category: "",
                    language: "",
                    state: "",
                    country: ""
                }));
            })
        );

    }*/

    // getStateNews(): Observable<NewsItem[]> {
    //     //const stateUrl = `http://192.168.0.5:8080/news/v1/state?keyword=Telangana&language=te&category=top`;
    //     const lang = this.languageService.current;
    //     console.log(lang);
    //     const stateUrl = `${this.apiUrl}/state`
    //     return this.httpClient.get<any>(stateUrl, {
    //         params: {
    //             deviceId: '12345'
    //         }
    //     }).pipe(
    //         map(response => {
    //             const articles = response || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 id: article.id,
    //                 title: article.title,
    //                 imageUrl: article.imageUrl || '', // fix: use actual image field if available
    //                 summary: article.summary || '',
    //                 time: article.publishedAt || '',
    //                 source: article.source || 'Unknown',
    //                 important: false,
    //                 link: article.link || '',
    //                 category: "",
    //                 language: "",
    //                 state: "",
    //                 country: ""
    //             }));
    //         })
    //     );
    //     /*const stateUrl = `http://192.168.0.2:8080/news/v1/language/telugu`;

    //     return this.httpClient.get<any>(stateUrl).pipe(
    //         map(response => {
    //             const articles = response.item || [];

    //             return articles.map((article: any): NewsItem => ({
    //                 title: article.title || '',
    //                 imageUrl: article.imageUrl || this.extractImageFromEncoded(article.encoded),
    //                 summary: article.description || '',
    //                 time: article.pubDate || '',
    //                 source: article.creator || 'Unknown',
    //                 link: article.link || '',
    //                 important: false
    //             }));
    //         })
    //     );

    //     const stateUrl = `http://192.168.0.2:8080/news/v1/language/hindi`;

    //     return this.httpClient.get<any>(stateUrl).pipe(
    //         map(response => {
    //             const articles = response.item || [];

    //             return articles.map((article: any): NewsItem => ({
    //                 title: article.title || '',
    //                 imageUrl: article.imageUrl || this.extractImageFromEncoded(article.encoded),
    //                 summary: article.description || '',
    //                 time: article.pubDate || '',
    //                 source: article.creator || 'Unknown',
    //                 link: article.link || '',
    //                 important: false
    //             }));
    //         })
    //     );*/
    // }

    getLatestNewsvideos(): Observable<any> {
        const videoUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCumtYpCY26F6Jr3satUgMvA&order=date&maxResults=20&type=video&key=AIzaSyDPjEzGzGwcxBOjyVknX73BjWYmEKQn5uU"
        return this.httpClient.get<any>(videoUrl);
    }


    // getNationalNews(): Observable<NewsItem[]> {
    //     //const nationalUrl = `http://192.168.0.6:8080/news/v1/national?country=in&category=top&language=te`;
    //     const nationalUrl = `${this.apiUrl}/national`;
    //     const lang = this.languageService.current;
    //     console.log(lang);
    //     /*return this.httpClient.get<any>(nationalUrl).pipe(
    //         map(response => {
    //             const articles = response.articles || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 title: article.title,
    //                 imageUrl: article.image || '', // fix: use actual image field if available
    //                 summary: article.description || '',
    //                 time: article.publishedAt || '',
    //                 source: article.source.name || 'Unknown',
    //                 link: article.link,
    //                 important: false
    //             }));
    //         })
    //     )*/
    //     return this.httpClient.get<any>(nationalUrl, {
    //         params: {
    //             deviceId: '12345'
    //         }
    //     }).pipe(
    //         map(response => {
    //             const articles = response || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 id: article.id,
    //                 title: article.title,
    //                 imageUrl: article.imageUrl || '', // fix: use actual image field if available
    //                 summary: article.summary || '',
    //                 time: article.publishedAt || '',
    //                 source: article.source || 'Unknown',
    //                 important: false,
    //                 link: article.link || '',
    //                 category: "",
    //                 language: "",
    //                 state: "",
    //                 country: ""
    //             }));
    //         })
    //     );
    // }

    // getInternationalNews() {
    //     //const internationUrl = `http://192.168.0.6:8080/news/v1/world?language=te&category=world`;
    //     const internationUrl = `${this.apiUrl}/world`;
    //     const lang = this.languageService.current;
    //     console.log(lang);
    //     /*return this.httpClient.get<any>(internationUrl).pipe(
    //         map(response => {
    //             const articles = response.news || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 title: article.title,
    //                 imageUrl: article.image || '', // fix: use actual image field if available
    //                 summary: article.description || '',
    //                 time: article.published || '',
    //                 source: article.author || 'Unknown',
    //                 link: article.link,
    //                 important: false
    //             }));
    //         })
    //     )*/
    //     return this.httpClient.get<any>(internationUrl, {
    //         params: {
    //             deviceId: '12345'
    //         }
    //     }).pipe(
    //         map(response => {
    //             const articles = response || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 id: article.id,
    //                 title: article.title,
    //                 imageUrl: article.imageUrl || '', // fix: use actual image field if available
    //                 summary: article.summary || '',
    //                 time: article.publishedAt || '',
    //                 source: article.source || 'Unknown',
    //                 important: false,
    //                 link: article.link || '',
    //                 category: "",
    //                 language: "",
    //                 state: "",
    //                 country: ""
    //             }));
    //         })
    //     );
    // }

    // getEntertainmentNews() {
    //     //const entertainmentUrl = `http://192.168.0.6:8080/news/v1/entertainment?language=te`;
    //     const entertainmentUrl = `${this.apiUrl}/entertainment`;
    //     const lang = this.languageService.current;
    //     console.log(lang);
    //     return this.httpClient.get<any>(entertainmentUrl, {
    //         params: {
    //             deviceId: '12345'
    //         }
    //     }).pipe(
    //         map(response => {
    //             console.log(response);
    //             const articles = response || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 id: article.id,
    //                 title: article.title,
    //                 imageUrl: article.imageUrl || '', // fix: use actual image field if available
    //                 summary: article.summary || '',
    //                 time: article.publishedAt || '',
    //                 source: article.source || 'Unknown',
    //                 important: false,
    //                 link: article.link || '',
    //                 category: "",
    //                 language: "",
    //                 state: "",
    //                 country: ""
    //             }));
    //         })
    //     );
    // }


    // getTechnologyNews() {
    //     //const technologyUrl = `http://192.168.0.6:8080/news/v1/technology?language=te`;
    //     const technologyUrl = `${this.apiUrl}/technology`;
    //     const lang = this.languageService.current;
    //     return this.httpClient.get<any>(technologyUrl, {
    //         params: {
    //             deviceId: '12345'
    //         }
    //     }).pipe(
    //         map(response => {
    //             console.log(response);
    //             const articles = response || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 id: article.id,
    //                 title: article.title,
    //                 imageUrl: article.imageUrl || '', // fix: use actual image field if available
    //                 summary: article.summary || '',
    //                 time: article.publishedAt || '',
    //                 source: article.source || 'Unknown',
    //                 important: false,
    //                 link: article.link || '',
    //                 category: "",
    //                 language: "",
    //                 state: "",
    //                 country: ""
    //             }));
    //         })
    //     );
    // }
    // getHealthNews() {
    //     //const healthUrl = `http://192.168.0.6:8080/news/v1/health?language=te&category=health`;
    //     const healthUrl = `${this.apiUrl}/health`;
    //     const lang = this.languageService.current;
    //     /*return this.httpClient.get<any>(healthUrl).pipe(
    //         map(response => {
    //             const articles = response.news || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 title: article.title,
    //                 imageUrl: article.image || '', // fix: use actual image field if available
    //                 summary: article.description || '',
    //                 time: article.published || '',
    //                 source: article.author || 'Unknown',
    //                 link: article.link,
    //                 important: false
    //             }));
    //         })
    //     )*/
    //     return this.httpClient.get<any>(healthUrl, {
    //         params: {
    //             deviceId: '12345'
    //         }
    //     }).pipe(
    //         map(response => {
    //             const articles = response || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 id: article.id,
    //                 title: article.title,
    //                 imageUrl: article.imageUrl || '', // fix: use actual image field if available
    //                 summary: article.summary || '',
    //                 time: article.publishedAt || '',
    //                 source: article.source || 'Unknown',
    //                 important: false,
    //                 link: article.link || '',
    //                 category: "",
    //                 language: "",
    //                 state: "",
    //                 country: ""
    //             }));
    //         })
    //     );
    // }
    // getBusinessNews() {
    //     //const businessUrl = `http://192.168.0.6:8080/news/v1/business?language=te`;
    //     const businessUrl = `${this.apiUrl}/business`;
    //     const lang = this.languageService.current;
    //     return this.httpClient.get<any>(businessUrl, {
    //         params: {
    //             deviceId: '12345'
    //         }
    //     }).pipe(
    //         map(response => {
    //             console.log(response);
    //             const articles = response || [];

    //             // ✅ Return the result of map
    //             return articles.map((article: any): NewsItem => ({
    //                 id: article.id,
    //                 title: article.title,
    //                 imageUrl: article.imageUrl || '', // fix: use actual image field if available
    //                 summary: article.summary || '',
    //                 time: article.publishedAt || '',
    //                 source: article.source || 'Unknown',
    //                 important: false,
    //                 link: article.link || '',
    //                 category: "",
    //                 language: "",
    //                 state: "",
    //                 country: ""
    //             }));
    //         })
    //     );
    // }

    // getJobs() {
    //     const jobsUrl = `${environment.apiBaseUrl}/api/v1/jobs`;

    //     return this.httpClient.get<any[]>(jobsUrl).pipe(
    //         map((jobs: any[]) =>
    //             jobs.map(job => ({
    //                 id: job.id,
    //                 title: job.title,
    //                 imageUrl: job.imageUrl || '',
    //                 summary: job.summary || '',
    //                 time: job.publishedAt || '',
    //                 source: job.source || 'Unknown',
    //                 important: false,
    //                 link: job.link || '',
    //                 category: '',
    //                 language: '',
    //                 state: "",
    //                 country: ""
    //             }))
    //         )
    //     );
    // }

    private extractImageFromEncoded(encoded: string): string {
        if (!encoded) return '';
        const match = encoded.match(/<img[^>]+src="([^">]+)"/i);
        return match ? match[1] : '';
    }

    addNews(newsItem: NewsItem) {
        console.log(newsItem);
        return this.httpClient.post<NewsItem>(this.apiUrl, newsItem, { headers: { 'Content-Type': 'application/json' } });
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