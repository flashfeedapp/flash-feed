import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { NewsService } from '../services/news.service';
import { PreferenceService } from '../services/preference.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {

  languages = [
    { name: 'te', enabled: false },
    { name: 'hi', enabled: false },
    { name: 'ta', enabled: false },
    { name: 'kn', enabled: false },
    { name: 'mr', enabled: false },
    { name: 'en', enabled: false }
  ];

  selectedLanguages: any[] = [];
  countries = [
    { name: 'India', enabled: false }
  ]

  states = [
    { name: 'Telangana', enabled: false },
    { name: 'Andhra Pradesh', enabled: false },
    { name: 'Delhi', enabled: false },
    { name: 'Maharashtra', enabled: false },
    { name: 'Tamil Nadu', enabled: false },
    { name: 'Karnataka', enabled: false }
  ]

  // Mapping of state to allowed languages
  stateLanguageMap: any = {
    'Telangana': ['te', 'hi', 'en'],
    'Andhra Pradesh': ['te', 'en'],
    'Delhi': ['hi', 'en'],
    'Maharashtra': ['hi', 'en'],
    'Tamil Nadu': ['ta', 'en'],
    'Karnataka': ['kn', 'en']
  };

  showLanguages = false;
  showCountries = true;
  showStates = true;

  constructor(private languageService: LanguageService, private newsService: NewsService, private preferenceService: PreferenceService) { }

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
  this.newsService.getUserDetails().subscribe(user => {

    this.states.forEach(s => s.enabled = false);

    const stateMatched = this.states.find(s => s.name === user.state);
    if (stateMatched) {
      stateMatched.enabled = true;

      // Filter languages for this state
      const allowedLangs = this.stateLanguageMap[user.state] || [];

      this.selectedLanguages = this.languages
        .filter(lang => allowedLangs.includes(lang.name))
        .map(lang => ({
          ...lang,
          enabled: lang.name === user.language
        }));
    }
  });
}

  toggleLanguage(lang: any) {
    // UI update
    this.selectedLanguages.forEach(l => l.enabled = false);
    lang.enabled = true;

    // DB update (PASS STRING ONLY)
    //this.newsService.updateUserDetails(lang.name,'','').subscribe();
    const result = this.preferenceService.saveLanguage(lang.name);

    if (result) {
      result.subscribe();
    }
  }

  toggleCountry(country: any) {
    // UI update
    this.countries.forEach(l => l.enabled = false);
    country.enabled = true;

    // DB update (PASS STRING ONLY)
    //this.newsService.updateUserDetails('',country.name,'').subscribe();
    const result = this.preferenceService.saveCountry(country.name);

    if (result) {
      result.subscribe();
    }
  }

  toggleState(state: any) {
    // UI update
    this.states.forEach(l => l.enabled = false);
    state.enabled = true;

    const allowedLanguages = this.stateLanguageMap[state.name] || [];

    this.selectedLanguages = this.languages.filter(lang => allowedLanguages.includes(lang.name))
    .map(lang => ({ ...lang, enabled: false }));

    // DB update (PASS STRING ONLY)
    //this.newsService.updateUserDetails('','',state.name).subscribe();
    const result = this.preferenceService.saveState(state.name);

    if (result) {
      result.subscribe();
    }
  }
}
