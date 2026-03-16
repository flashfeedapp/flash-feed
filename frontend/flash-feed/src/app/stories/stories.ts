import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsItem } from '../core/models/news.model';

@Component({
  selector: 'app-stories',
  imports: [CommonModule],
  templateUrl: './stories.html',
  styleUrl: './stories.scss'
})
export class Stories {

  stories: NewsItem[] = [];

  constructor(private newsService: NewsService, private router : Router) {}

  ngOnInit(): void {
    this.preloadStory();
    console.log(this.stories);
  }
  preloadStory() : void {
    this.newsService.getStory('english').subscribe(data => {
      this.stories = data;
      console.log(data);
    })
  }
}
