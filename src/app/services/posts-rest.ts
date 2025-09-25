import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommentDto, PostDto, UserDto } from '../model/interfaces';

@Injectable({ providedIn: 'root' })
export class PostsRest {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  getPosts(): Observable<PostDto[]> {
    return this.httpClient.get<PostDto[]>(`${this.baseUrl}/posts`);
  }

  getUser(userId: number): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.baseUrl}/users/${userId}`);
  }

  getPostComments(postId: number): Observable<CommentDto[]> {
    return this.httpClient.get<CommentDto[]>(`${this.baseUrl}/posts/${postId}/comments`);
  }
}

