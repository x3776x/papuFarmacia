import { Component } from '@angular/core';

@Component({
  selector: 'search-for',
  standalone: true,
  imports: [],
  templateUrl: './search-for.html',
})
export class PageSearchFor {
  results: any[] = [];
  searchQuery: string = '';

  constructor() {}
}
