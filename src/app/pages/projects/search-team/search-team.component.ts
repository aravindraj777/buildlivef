import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.component.html',
  styleUrl: './search-team.component.scss'
})
export class SearchTeamComponent {

  @Output() searchQueryChanged:EventEmitter<string> = new EventEmitter<string>();

  constructor(){}

  onSearchQueryChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const query = target.value;
      // Your search logic here
    }
  }
  
}
