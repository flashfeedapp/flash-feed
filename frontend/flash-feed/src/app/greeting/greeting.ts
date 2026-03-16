import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GreetingService } from '../services/greeting.service';
import { GreetingModel } from '../core/models/greeting.model';

@Component({
  selector: 'app-greeting',
  imports: [CommonModule, FormsModule],
  templateUrl: './greeting.html',
  styleUrl: './greeting.scss'
})
export class Greeting {

  greeting: GreetingModel = {
    title: '',
    message: '',
    active: true,
    festivalDate: ''
  };

  visible = false;
  successMessage = '';
  errorMessage = '';
  showNewGreeting = false;

  constructor(private greetingService: GreetingService) {}

  ngOnInit(): void {
    this.loadGreeting();
  }

  loadGreeting() {
    this.greetingService.getActiveGreeting().subscribe({
      next: (data) => {
        if (data) {
          this.greeting = data;
          this.visible = true;
        }
      },
      error: () => {
        this.visible = false;
      }
    });
  }

  closeGreeting() {
    this.visible = false;
  }

  saveGreeting() {
    if (!this.greeting.title || !this.greeting.message) {
      this.errorMessage = 'Title and Message are required';
      return;
    }

    this.greetingService.createGreeting(this.greeting).subscribe({
      next: () => {
        this.successMessage = 'Greeting saved successfully';
        this.errorMessage = '';
        this.resetForm();
      },
      error: () => {
        this.errorMessage = 'Failed to save greeting';
      }
    });
  }

  deactivateAll() {
    this.greetingService.deactivateAll().subscribe(() => {
      this.successMessage = 'All greetings deactivated';
    });
  }

  resetForm() {
    this.greeting = {
      title: '',
      message: '',
      active: true,
      festivalDate: ''
    };
  }

  openGreetingBox () {
    this.showNewGreeting = !this.showNewGreeting;
  }
}