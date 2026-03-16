import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NewsService } from '../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-videos',
  imports: [CommonModule],
  templateUrl: './news-videos.html',
  styleUrl: './news-videos.scss'
})
export class NewsVideos {

  videos: any[] = [];
  loading : boolean = true;
  error: boolean = false;
  selectedVideoId: string | null = null;
  sanitizedVideoUrl!: SafeResourceUrl;

  constructor(private newsService : NewsService, private sanitizer : DomSanitizer) {}

  ngOnInit(): void {
    this.newsService.getLatestNewsvideos().subscribe({
      next: (response : any) => {
        this.videos = response.items;
        this.loading = false
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    })
  }

  playVideo(id: string) {
    this.selectedVideoId = id;
    this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}`
    );
  }

  closePlayer() {
    this.selectedVideoId = null;
  }
}
