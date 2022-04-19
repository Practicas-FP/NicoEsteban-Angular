import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';

const routes: Routes = [
  { path: '', redirectTo: 'upcoming-movies', pathMatch: 'full' },
  //{ path: 'movies', component: MoviesComponent },
  //{ path: 'movies', loadChildren: () => import('./components/movies/movies.module').then(m => m.MoviesModule) },
  { path: 'popular-movies', loadChildren: () => import('./components/popular-movies/popular-movies.module').then(m => m.PopularMoviesModule) },
  { path: 'upcoming-movies', loadChildren: () => import('./components/upcoming-movies/upcoming-movies.module').then(m => m.UpcomingMoviesModule) },
  { path: 'top-rated-movies', loadChildren: () => import('./components/top-rated-movies/top-rated-movies.module').then(m => m.TopRatedMoviesModule) },
  { path: 'movie-details/:id', loadChildren: () => import('./components/movie-details/movie-details.module').then(m => m.MovieDetailsModule) },
  { path: 'watchlist', loadChildren: () => import('./components/watchlist/watchlist.module').then(m => m.WatchlistModule) },
  { path: 'log-in', loadChildren: () => import('./user-sesion/log-in/log-in.module').then(m => m.LogInModule) },
  { path: 'sign-in', loadChildren: () => import('./user-sesion/sign-in/sign-in.module').then(m => m.SignInModule) }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
