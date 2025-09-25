import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface PostDto {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentDto {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class PostsRest {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  getPosts(): Observable<PostDto[]> {
    return this.httpClient.get<PostDto[]>(`${this.baseUrl}/posts`);
  }
}

