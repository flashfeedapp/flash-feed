import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsVideos } from './news-videos';

describe('NewsVideos', () => {
  let component: NewsVideos;
  let fixture: ComponentFixture<NewsVideos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsVideos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsVideos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
