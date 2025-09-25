import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostsStore } from '../../../../services/posts-store';


@Component({
  selector: 'app-posts-filters',
  imports: [],
  template: `
    <label>
      <input type="checkbox" [checked]="postsStore.showOnlyFavorites()" (change)="toggleFavoritesFilter($event)" />
      Pokaż tylko ulubione
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsFilters {
  protected readonly postsStore = inject(PostsStore);

  toggleFavoritesFilter(event: Event): void {
    event.stopPropagation();
    this.postsStore.toggleFavoritesFilter();
  }
}
