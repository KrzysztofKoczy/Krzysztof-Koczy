import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts'
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/posts/shell/posts-shell/posts-shell').then((c) => c.PostsShell)
  },
  {
    path: `**`,
    redirectTo: 'posts'
  }
];