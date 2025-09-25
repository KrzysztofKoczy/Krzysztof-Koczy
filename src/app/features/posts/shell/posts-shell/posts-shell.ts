import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostsFilters } from '../../list/posts-filters/posts-filters';
import { PostsList } from '../../list/posts-list/posts-list';

@Component({
  selector: 'app-posts-shell',
  standalone: true,
  imports: [PostsFilters, PostsList],
  template: `
    <section class="flex flex-col gap-6">
      <app-posts-filters />
      <app-posts-list />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsShell {
}

