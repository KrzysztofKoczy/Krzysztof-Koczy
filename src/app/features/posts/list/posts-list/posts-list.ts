import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';

import { CommentDto, PostDto, UserDto } from '../../../../services/posts-rest';
import { Modal } from '../../../../shared/modal/modal';
import { PostsStore } from '../../../../services/posts-store';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, Modal],
  templateUrl: './posts-list.html',
  styleUrls: ['./posts-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsList implements OnInit {
  private readonly postsStore = inject(PostsStore);
  private readonly destroyRef = inject(DestroyRef);

  posts = signal<PostDto[]>([]);
  selectedPostId = signal<number | null>(null);
  selectedPostDetails = signal<{ post: PostDto; user: UserDto; comments: CommentDto[] } | null>(null);
  isLoadingDetails = signal(false);
  isModalOpen = computed(() => this.selectedPostId() !== null);
  
  ngOnInit(): void {
    this.postsStore.posts$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((posts) => this.posts.set(posts));

    this.postsStore.loadPosts();
  }

  openPost(postId: number): void {
    this.selectedPostId.set(postId);

    const post = this.posts().find((p) => p.id === postId);

    if (!post) {
      this.isLoadingDetails.set(false);
      this.selectedPostDetails.set(null);
      return;
    }

    this.isLoadingDetails.set(true);
    this.selectedPostDetails.set(null);

    forkJoin({
      user: this.postsStore.getUser(post.userId),
      comments: this.postsStore.getPostComments(postId)
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ user, comments }) => {
          this.selectedPostDetails.set({ post, user, comments });
        },
        error: (error) => {
          console.error('error', error);
          this.isLoadingDetails.set(false);
        },
        complete: () => this.isLoadingDetails.set(false)
      });
  }

  closeModal(): void {
    this.selectedPostId.set(null);
    this.selectedPostDetails.set(null);
    this.isLoadingDetails.set(false);
  }

  toggleFavorite(postId: number): void {
    console.log('toggleFavorite', postId);

  }
}
