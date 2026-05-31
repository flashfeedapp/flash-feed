import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { NewsService } from '../services/news.service';
import { PreferenceService } from '../services/preference.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-preferences',
  imports: [FormsModule, CommonModule],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss'
})
export class Preferences {

  preferences = {
    country: '',
    state: '',
    language: ''
  };

  constructor(private languageService: LanguageService, private newsService: NewsService, private router: Router,
    private preferenceService: PreferenceService) { }

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

  showLanguages = true;
  showCountries = true;
  showStates = true;

  ngOnInit() {
    this.toggleCountry(this.countries[0]);

    this.loadUserDetails();
  }

  loadUserDetails() {

    if (Capacitor.isNativePlatform()) {

      this.newsService.getUserDetails().subscribe(user => {
        localStorage.setItem('userRole', user.role);
        this.states.forEach(s => s.enabled = false);

        const stateMatched = this.states.find(s => s.name === user.state);

        if (stateMatched) {

          stateMatched.enabled = true;

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

      const state = localStorage.getItem('state');
      const language = localStorage.getItem('language');
      //localStorage.setItem('userRole', "Admin");

      if (state) {

        const stateMatched = this.states.find(s => s.name === state);

        if (stateMatched) {

          stateMatched.enabled = true;

          const allowedLangs = this.stateLanguageMap[state] || [];

          this.selectedLanguages = this.languages
            .filter(lang => allowedLangs.includes(lang.code))
            .map(lang => ({
              ...lang,
              enabled: lang.code === language
            }));
        }
      }
    }
  }

  toggleLanguage(lang: any) {

    // toggle ON/OFF properly
    lang.enabled = !lang.enabled;

    // if turned ON → make others OFF (single select)
    if (lang.enabled) {
      this.selectedLanguages.forEach(l => {
        if (l !== lang) l.enabled = false;
      });
    }

    //const result = this.preferenceService.saveLanguage(lang.code);
    //if (result) result.subscribe();
  }

  toggleCountry(country: any) {
    // UI update
    this.countries.forEach(l => l.enabled = false);
    country.enabled = true;

    // DB update (PASS STRING ONLY)
    //const result = this.preferenceService.saveCountry(country.name);

    //if (result) {
    //  result.subscribe();
    //}
  }

  toggleState(state: any) {

    // If already selected → deselect it
    if (state.enabled) {
      state.enabled = false;
      this.selectedLanguages = [];

      const result = this.preferenceService.saveState('');
      if (result) result.subscribe();

      return;
    }

    // Select one state only
    this.states.forEach(s => s.enabled = false);
    state.enabled = true;

    this.showLanguages = true;

    const allowedLanguages = this.stateLanguageMap[state.name] || [];

    this.selectedLanguages = this.languages
      .filter(lang => allowedLanguages.includes(lang.code))
      .map(lang => ({
        ...lang,
        enabled: false
      }));

    //const result = this.preferenceService.saveState(state.name);
    //if (result) result.subscribe();
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
