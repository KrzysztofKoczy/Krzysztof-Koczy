import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [],
  templateUrl: './posts-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsList {
}
