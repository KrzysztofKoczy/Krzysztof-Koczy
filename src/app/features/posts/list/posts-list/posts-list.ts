import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { CommentDto, PostDto, PostsRest, UserDto } from '../../../../services/posts-rest';
import { ModalComponent } from '../../../../shared/modal/modal.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './posts-list.html',
  styleUrls: ['./posts-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsList implements OnInit {
  private readonly postsRest = inject(PostsRest);
  private readonly destroyRef = inject(DestroyRef);

  posts = signal<PostDto[]>([]);
  selectedPostId = signal<number | null>(null);
  isModalOpen = computed(() => this.selectedPostId() !== null);
  selectedPostDetails = signal<{ post: PostDto; user: UserDto; comments: CommentDto[] } | null>(null);
  isLoadingDetails = signal(false);
  
  ngOnInit(): void {
    this.loadPosts();
  }

  openPost(postId: number): void {
    this.selectedPostId.set(postId);

    const post = this.posts().find((p) => p.id === postId);
    
    if (!post) {
      console.log('Nie znaleziono posta');
      return;
    }

    this.isLoadingDetails.set(true);
    this.selectedPostDetails.set(null);

    forkJoin({
      user: this.postsRest.getUser(post.userId),
      comments: this.postsRest.getPostComments(postId)
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ user, comments }) => {
          this.selectedPostDetails.set({ post, user, comments });
          console.log('selectedPostDetails', this.selectedPostDetails());
        },
        error: (error) => {
          console.log('error', error)
        },
        complete: () => this.isLoadingDetails.set(false)
      });
  }

  closeModal(): void {
    this.selectedPostId.set(null);
    this.selectedPostDetails.set(null);
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
