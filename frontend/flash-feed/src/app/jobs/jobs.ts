import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { CommonModule } from '@angular/common';
import { Job } from '../core/models/jobs.model';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss'
})
export class Jobs {

  allJobs: Job[] = [];

  govtJobs: Job[] = [];
  privateJobs: Job[] = [];
  jobNews: Job[] = [];

  selectedTab: 'govt' | 'private' | 'news' = 'govt';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  private loadJobs(): void {
    this.newsService.getJobs().subscribe({
      next: (jobs) => {
        this.allJobs = jobs || [];

        this.govtJobs = this.allJobs.filter(j => j.jobType === 'GOVERNMENT');
        this.privateJobs = this.allJobs.filter(j => j.jobType === 'PRIVATE');
        this.jobNews = this.allJobs.filter(j => j.jobType === 'NEWS');
      },
      error: () => this.allJobs = []
    });
  }

  selectTab(tab: 'govt' | 'private' | 'news') {
    this.selectedTab = tab;
  }

  getCurrentList() {
    if (this.selectedTab === 'govt') return this.govtJobs;
    if (this.selectedTab === 'private') return this.privateJobs;
    return this.jobNews;
  }

  openJob(link: string) {
    if (link) window.open(link, '_blank');
  }
}