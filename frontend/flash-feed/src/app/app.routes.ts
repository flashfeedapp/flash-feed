import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Submit } from './submit/submit';
import { Settings } from './settings/settings';
import { NewsVideos } from './news-videos/news-videos';
import { Stories } from './stories/stories';
import { Preferences } from './preferences/preferences';
import { Jobs } from './jobs/jobs';
import { News } from './news/news';
import { Facts } from './facts/facts';


export const routes: Routes = [
    {
    path: '',
    component: Home,
    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },

      { path: 'news', component: News },
      { path: 'jobs', component: Jobs },
      { path: 'facts', component: Facts },
      { path: 'stories', component: Stories }
    ]
  },
    {path : 'home', component : Home},
    {path : 'news-videos', component : NewsVideos},
    {path : 'submit', component: Submit},
    {path : 'settings', component: Settings},
    {path : 'preferences', component: Preferences},
];
