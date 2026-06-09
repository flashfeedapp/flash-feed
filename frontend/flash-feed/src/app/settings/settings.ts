import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { NewsService } from '../services/news.service';
import { PreferenceService } from '../services/preference.service';
import { Router } from '@angular/router';

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

  constructor(private languageService: LanguageService, private newsService: NewsService, private preferenceService: PreferenceService, private router: Router) { }

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

    if (lang.enabled) {
      this.selectedLanguages.forEach(l => {
        if (l !== lang) {
          l.enabled = false;
        }
      });
    }
  }

  toggleCountry(country: any) {
    // UI update
    this.countries.forEach(l => l.enabled = false);
    country.enabled = true;

    /*const result = this.preferenceService.saveCountry(country.name);

    if (result) {
      result.subscribe({
        next: (res) => console.log('Country saved', res),
        error: (err) => console.error('Error saving Country', err)
      });
    }*/
  }

  toggleState(state: any) {

    if (!state.enabled) {
      this.selectedLanguages = [];
      return;
    }

    this.states.forEach(s => {
      if (s !== state) {
        s.enabled = false;
      }
    });

    const allowedLanguages = this.stateLanguageMap[state.name] || [];

    this.selectedLanguages = this.languages
      .filter(lang => allowedLanguages.includes(lang.code))
      .map(lang => ({
        ...lang,
        enabled: false
      }));
  }

  openPrivacy() {
    this.router.navigate(['/privacy']);
  }

  isFormValid(): boolean {
    const countrySelected = this.countries.some(c => c.enabled);
    const stateSelected = this.states.some(s => s.enabled);
    const languageSelected = this.selectedLanguages.some(l => l.enabled);

    return countrySelected && stateSelected && languageSelected;
  }

  getHintText(): string {

    const countrySelected = this.countries.some(c => c.enabled);
    if (!countrySelected) {
      return 'Select your country to personalize news';
    }

    const stateSelected = this.states.some(s => s.enabled);

    if (!stateSelected) {
      return 'Select your state to personalize news';
    }

    const languageSelected = this.selectedLanguages.some(l => l.enabled);

    if (!languageSelected) {
      return 'Choose your language to personalize news';
    }

    return 'You are all set ✨';
  }

  redirectToHome() {

    const selectedCountry = this.countries.find(c => c.enabled)?.name || '';
    const selectedState = this.states.find(s => s.enabled)?.name || '';
    const selectedLanguage = this.selectedLanguages.find(l => l.enabled)?.code || '';

    if (!selectedCountry || !selectedState || !selectedLanguage) {
      return;
    }

    const data = {
      country: selectedCountry,
      state: selectedState,
      language: selectedLanguage
    };

    console.log(data);
    this.preferenceService.saveUserDetails(data).subscribe({
      next: () => {
        localStorage.setItem('isPreferenceCompleted', 'Y');
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err)
    });
  }
}
