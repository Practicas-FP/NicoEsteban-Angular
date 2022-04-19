import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent implements OnInit {

  userIsLoggued: boolean = false;

  listOfMovies!: Observable<any>;
  hideTitle: boolean = false;
  hideResultsFor: boolean = true;
  hidePagination: boolean = false;
  movieSearched: string = "";
  pagination: number[] = [1, 2, 3, 4, 5];

  //Pagination
  p: number = 1;

  constructor(private movieSvc: MovieService) { }

  ngOnInit(): void {
    this.getUpcomingMovies(1);
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

  getUpcomingMovies(page: number): void {
    this.listOfMovies = this.movieSvc.getUpcomingMovies(page);
  }

}
