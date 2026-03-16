import { Component, Input } from '@angular/core';
import { NewsService } from '../services/news.service';
import { NewsItem } from '../core/models/news.model';
import { CommonModule } from '@angular/common';
import { Job } from '../core/models/jobs.model';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss'
})
export class Jobs {

  allJobs: Job[] = [];

  govtJobs: Job[] = [];
  privateJobs: Job[] = [];
  jobNews: Job[] = [];

  showGovt = true;
  showPrivate = false;
  showNews = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  private loadJobs(): void {

    this.newsService.getJobs().subscribe({

      next: (jobs) => {

        this.allJobs = jobs || [];

        this.govtJobs = this.allJobs.filter(j =>
          j.jobType === 'GOVERNMENT'
        );

        this.privateJobs = this.allJobs.filter(j =>
          j.jobType === 'PRIVATE'
        );

        this.jobNews = this.allJobs.filter(j =>
          j.jobType === 'NEWS'
        );

      },

      error: () => {
        this.allJobs = [];
      }

    });

  }

  toggle(section: string) {

    if (section === 'govt') this.showGovt = !this.showGovt;
    if (section === 'private') this.showPrivate = !this.showPrivate;
    if (section === 'news') this.showNews = !this.showNews;

  }

  openJob(link: string) {
    if (!link) return;
    window.open(link, '_blank');
  }

}