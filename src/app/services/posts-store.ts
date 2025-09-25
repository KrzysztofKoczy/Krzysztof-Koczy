import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { CommentDto, PostDto, PostsRest, UserDto } from './posts-rest';

@Injectable({ providedIn: 'root' })
export class PostsStore {
  private readonly postsRest = inject(PostsRest);
  private readonly postsSubject = new BehaviorSubject<PostDto[]>([]);

  readonly posts$: Observable<PostDto[]> = this.postsSubject.asObservable();

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
}


