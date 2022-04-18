import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.component.html',
  styleUrls: ['./top-rated-movies.component.css']
})
export class TopRatedMoviesComponent implements OnInit {

  listOfMovies!: Observable<any>;
  hideTitle: boolean = false;
  hideResultsFor: boolean = true;
  hidePagination: boolean = false;
  movieSearched: string = "";
  pagination: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private movieSvc: MovieService) { }

  ngOnInit(): void {
    this.getTopRatedMovies(1);
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

  getTopRatedMovies(page: number): void {
    this.listOfMovies = this.movieSvc.getTopRatedMovies(page);
  }

}
