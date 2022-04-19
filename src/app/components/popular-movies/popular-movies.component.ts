import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent implements OnInit {

  listOfMovies!: Observable<any>;
  hideTitle: boolean = false;
  hideResultsFor: boolean = true;
  hidePagination: boolean = false;
  movieSearched: string = "";
  pagination: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //Pagination
  p: number = 1;

  constructor(private movieSvc: MovieService) { }

  ngOnInit(): void {
    this.getPopularMovies(1);
  }

  searchMovies(input: string) {
    if (input != '') {
      this.listOfMovies = this.movieSvc.searchMovies(input.trim(), 1);
      this.hideTitle = true;
      this.hideResultsFor = false;
      this.hidePagination = true;
      this.movieSearched = input.trim();
    } else {
      alert('Type a movie title to search for');
    }
  }

  getPopularMovies(page: number): void {
    this.listOfMovies = this.movieSvc.getPopularMovies(page);
  }

}
