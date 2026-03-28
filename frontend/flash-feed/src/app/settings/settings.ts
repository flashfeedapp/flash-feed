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
    { code: 'te', name: 'telugu', enabled: false },
    { code: 'hi', name: 'hindi', enabled: false },
    { code: 'ta', name: 'tamil', enabled: false },
    { code: 'kn', name: 'Kannada', enabled: false },
    { code: 'mr', name: 'marathi', enabled: false },
    { code: 'en', name: 'english', enabled: false }
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
    if (this.preferenceService.isMobile()) {
      this.newsService.getUserDetails().subscribe(user => {

        this.states.forEach(s => s.enabled = false);

        const countryMatched = this.countries.find(c => c.name === user.country);
        if (countryMatched) {
          countryMatched.enabled = true;
        }
        const stateMatched = this.states.find(s => s.name === user.state);
        if (stateMatched) {
          stateMatched.enabled = true;

          // Filter languages for this state
          const allowedLangs = this.stateLanguageMap[user.state] || [];

          this.selectedLanguages = this.languages
            .filter(lang => allowedLangs.includes(lang.code))
            .map(lang => ({
              ...lang,
              enabled: lang.code === user.language
            }));
        }
      });
    } else {
      const country = this.preferenceService.getCountry();
      const state = this.preferenceService.getState();
      const language = this.preferenceService.getLanguage();

      this.countries.forEach(c => c.enabled = c.name === country);

      // ✅ STATE
      this.states.forEach(s => s.enabled = s.name === state);

      // ✅ FILTER LANGUAGES BASED ON STATE
      const allowed = this.stateLanguageMap[state || ''] || [];

      this.selectedLanguages = this.languages
        .filter(l => allowed.includes(l.code))
        .map(l => ({
          ...l,
          enabled: l.code === language
        }));
    }
  }

  toggleLanguage(lang: any) {
    // UI update
    this.selectedLanguages.forEach(l => l.enabled = false);
    lang.enabled = true;

    // DB update (PASS STRING ONLY)
    //this.newsService.updateUserDetails(lang.name,'','').subscribe();
    const result = this.preferenceService.saveLanguage(lang.code);

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

    this.selectedLanguages = this.languages.filter(lang => allowedLanguages.includes(lang.code))
      .map(lang => ({ ...lang, enabled: false }));

    // DB update (PASS STRING ONLY)
    //this.newsService.updateUserDetails('','',state.name).subscribe();
    const result = this.preferenceService.saveState(state.name);

    if (result) {
      result.subscribe();
    }
  }
}
