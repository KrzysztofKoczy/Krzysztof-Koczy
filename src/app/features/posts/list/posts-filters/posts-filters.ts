import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PostsStore } from '../../../../services/posts-store';

@Component({
  selector: 'app-posts-filters',
  templateUrl: './posts-filters.html',
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
