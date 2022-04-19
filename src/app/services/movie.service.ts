import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IMovie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  API_KEY = '572f6e73385919e6eb3a365a3e144cce';

  URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=es-ES&`
  URL_UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}&language=es-ES&`;
  URL_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.API_KEY}&language=es-ES&`;

  API_URL_SEARCH_BY_NAME = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=batman&page=4`;
  API_URL_MOVIE_DETAILS = `https://api.themoviedb.org/3/`;
  URL_RELATED_MOVIES = `  https://api.themoviedb.org/3/movie/`;

  public  resultados: IMovie[] = [];

  constructor(private http: HttpClient) {
  }

  getUpcomingMovies(page = 1) {
    return this.http.get<any[]>(this.URL_UPCOMING + `page=${page}`)
      .pipe(map((data: any) => data.results));
  }

  getPopularMovies(page = 1) {
    return this.http.get<any[]>(this.URL_POPULAR + `page=${page}`)
      .pipe(map((data: any) => data.results));
  }

  getTopRatedMovies(page = 1) {
    return this.http.get<any[]>(this.URL_TOP_RATED + `page=${page}`)
      .pipe(map((data: any) => data.results));
  }

  searchMovies(query = '', page = 1) {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${query}&page=${page}&language=es-ES`)
      .pipe(map((data: any) => data.results));
  }

  getMovieDetails(movieId: number) {
    return this.http.get<any>(this.API_URL_MOVIE_DETAILS + `movie/${movieId}?api_key=${this.API_KEY}&language=es-ES`);
    //return this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.API_KEY}&language=es-ES`);
  }

  movie!: IMovie;
  obtenerInfoPeli(movieId: number) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=572f6e73385919e6eb3a365a3e144cce&language=es-ES`;

    this.http.get<IMovie>(url)
      .subscribe((response) => {
        this.movie.title = response.title;
        this.movie.poster_path = response.poster_path;
        this.movie.vote_average = response.vote_average;
        this.movie.vote_count = response.vote_count;
        this.movie.overview = response.overview;
        this.movie.runtime = response.runtime;
        this.movie.release_date = response.release_date;
        this.movie.original_language = response.original_language;
        this.movie.genres = response.genres;
      }, err => {
        //this.router.navigate(["error"])
      })

      return this.movie;
  }

  getRelatedMovies(movieId: number) {
    return this.http.get<any>(this.URL_RELATED_MOVIES + `${movieId}/similar?api_key=${this.API_KEY}&language=en-US&page=1`)
      .pipe(map((data: any) => data.results));
  }

}
