import { Component } from '@angular/core';
import { FactService } from '../services/facts.service';
import { Fact } from '../core/models/facts.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facts',
  imports: [CommonModule],
  templateUrl: './facts.html',
  styleUrl: './facts.scss'
})
export class Facts {

  facts: Fact[] = [];

  constructor(private factService: FactService) { }

  ngOnInit(): void {

    this.factService.getFacts().subscribe(data => {
      this.facts = data;
    });

  }

  toggleMore(facts: Fact) {

    facts.expanded = !facts.expanded;

  }

  shareContent(fact: any, event: Event) {
    event.stopPropagation();

    const text = `${fact.fact}
    ${fact.shortExplanation}

Read more interesting facts on News Bird 👇
https://play.google.com/store/apps/details?id=YOUR_APP_ID`;

    // ✅ Native app
    if (window && (window as any).Capacitor?.isNativePlatform?.()) {
      import('@capacitor/share').then(({ Share }) => {
        Share.share({
          title: 'Flash Feed',
          text: text
        });
      });
      return;
    }

    // ✅ Modern mobile browsers (HTTPS only)
    if (navigator.share) {
      navigator.share({
        title: 'Flash Feed',
        text: text
      }).catch(() => { });
    }
    // ✅ Final fallback (always works)
    else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied! Share anywhere 👍');
      }).catch(() => {
        alert(text); // worst case fallback
      });
    }
  }
}
