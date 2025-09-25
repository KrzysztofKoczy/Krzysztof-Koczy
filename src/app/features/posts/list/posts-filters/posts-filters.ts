import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostsStore } from '../../../../services/posts-store';

@Component({
  selector: 'app-posts-filters',
  imports: [],
  template: `
    <div class="filters-container">
      <label>
        Filter by body:
        <input type="text" [value]="postsStore.bodyQuery()" (input)="setBodyQuery($event)" />
      </label>

      <label>
        Filter by user:
        <input type="number" min=1 [value]="postsStore.userIdFilter()" (input)="setUserId($event)" />
      </label>

      <label>
        Show only favorites 
        <input type="checkbox" [checked]="postsStore.showOnlyFavorites()" (change)="toggleFavoritesFilter($event)" />
      </label>
    <div>
  `,
  styleUrls: ['./posts-filters.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsFilters {
  protected readonly postsStore = inject(PostsStore);

  toggleFavoritesFilter(event: Event): void {
    event.stopPropagation();
    this.postsStore.toggleFavoritesFilter();
  }

  setBodyQuery(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.postsStore.setBodyQuery(value);
  }

  setUserId(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.postsStore.setUserIdFilter(value ? Number(value) : null);
  }
}
