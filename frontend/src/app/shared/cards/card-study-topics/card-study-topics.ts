import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card-study-topics',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './card-study-topics.html',
  styles: ``,
})
export class ComponentCardStudyTopics {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() color: string = 'bg-white';
  @Input() route!: string;

  constructor(private router: Router) {}

  navigate() {
    if (this.route) {
      this.router.navigate([this.route]);
    } else {
      console.warn('No route provided for navigation');
    }
  }
}
