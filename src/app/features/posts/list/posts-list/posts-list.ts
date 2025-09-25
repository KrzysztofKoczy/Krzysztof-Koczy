import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostDto, PostsRest } from '../../../../services/posts-rest';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [],
  templateUrl: './posts-list.html',
  styleUrls: ['./posts-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsList implements OnInit {
  private readonly postsRest = inject(PostsRest);
  private readonly destroyRef = inject(DestroyRef);

  posts = signal<PostDto[]>([]);

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.postsRest
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((posts) => { 
        console.log('Posts:', posts)
        this.posts.set(posts);  
      });
  }
}
