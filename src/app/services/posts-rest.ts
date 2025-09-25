import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

export interface AddressDto {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoDto;
}

export interface GeoDto {
  lat: string;
  lng: string;
}

export interface CompanyDto {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressDto;
  phone: string;
  website: string;
  company: CompanyDto;
}

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

