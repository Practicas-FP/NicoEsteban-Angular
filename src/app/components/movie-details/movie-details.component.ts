import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { MovieService } from 'src/app/services/movie.service';
import { Observable, take } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IMovie } from 'src/app/interfaces/movie.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";


//FIRESTORE:
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId!: number;
  movie!: Observable<IMovie>;
  listOfRelatedMovies!: Observable<any>;

  userUID: string = "";
  userIsLoggued!: boolean;
  showSuccessMessaje: boolean = false;
  showErrorMessaje!: boolean;
  showAddButton: boolean = true;
  showAddedButton: boolean = false;

  constructor(
    private movieSvc: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {

    //Obtaining movie id coming from MoviesModule;
    this.route.params
      .pipe(take(1))
      .subscribe((params) => {
        this.movieId = params['id'];
      });
    this.movie = this.movieSvc.getMovieDetails(this.movieId);

    this.getRelatedMovies();
    this.onUrlChange();

    // Checking if user is loggued in:
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userIsLoggued = true;
        this.userUID = user.uid;
      } else {
        this.userIsLoggued = false;
      }
    });
  }

  getRelatedMovies() {
    this.listOfRelatedMovies = this.movieSvc.getRelatedMovies(this.movieId);
  }

  onUrlChange(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).
      subscribe(() => {
        this.movie = this.movieSvc.getMovieDetails(this.movieId);
        window.location.reload();
      });
  }

  async addToWatchlist() {
    if (this.userIsLoggued == true) {

      //Saving in Firestore
      try {
        const docRef = await addDoc(collection(db, "watchlist"), {
          user_uid: this.userUID,
          movie_id: this.movieId,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      this.showAddButton = false;
      this.showAddedButton = true;
      this.showSuccessMessaje = true;
    }
    if (this.userIsLoggued == false) {
      this.showErrorMessaje = true;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
