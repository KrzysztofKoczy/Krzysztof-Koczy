import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { CommentDto, PostDto, PostsRest, UserDto } from './posts-rest';

@Injectable({ providedIn: 'root' })
export class PostsStore {
  private readonly postsRest = inject(PostsRest);
  private readonly postsSubject = new BehaviorSubject<PostDto[]>([]);

  readonly posts$: Observable<PostDto[]> = this.postsSubject.asObservable();
  favoritePosts = signal<PostDto[]>([]);
  showOnlyFavorites = signal(false);

  loadPosts(): void {
    this.postsRest
      .getPosts()
      .pipe(tap((posts) => this.postsSubject.next(posts)))
      .subscribe({
        error: (error) => console.error('error', error)
      });
  }

  setPosts(posts: PostDto[]): void {
    this.postsSubject.next(posts);
  }

  getUser(userId: number): Observable<UserDto> {
    return this.postsRest.getUser(userId);
  }

  getPostComments(postId: number): Observable<CommentDto[]> {
    return this.postsRest.getPostComments(postId);
  }

  toggleFavorite(postId: number): void {
    const favorites = this.favoritePosts();
    const exists = favorites.some((post) => post.id === postId);

    if (exists) {
      this.favoritePosts.set(favorites.filter((post) => post.id !== postId));

      return;
    }

    const post = this.postsSubject.value.find((item) => item.id === postId);
    
    this.favoritePosts.set([...favorites!, post!]);
  }

  toggleFavoritesFilter(): void {
    this.showOnlyFavorites.update((value) => !value);
  }
}


