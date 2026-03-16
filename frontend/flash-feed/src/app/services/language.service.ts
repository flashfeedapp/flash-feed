import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({ providedIn: 'root'})
export class LanguageService {

    private languageSubject = new BehaviorSubject<string>('te');
    language$ = this.languageSubject.asObservable();

    get current(): string {
        return this.languageSubject.value;
    }

    setLanguage(lang: string) {
        this.languageSubject.next(lang);
    }
}