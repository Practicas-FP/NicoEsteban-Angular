import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { MovieService } from 'src/app/services/movie.service';
import { Observable, take } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IMovie } from 'src/app/interfaces/movie.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
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

  //Movie info from DB:
  _title!: string;
  _poster_path !: string;
  _release_date!: string;
  _vote_average!: string;
  _vote_count!: string;

  //Pagination
  p: number = 1;


  constructor(
    private movieSvc: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient,
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
    this.getMovieData();

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
  //--OnInit

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


  getMovieData() {
    const url = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=572f6e73385919e6eb3a365a3e144cce&language=es-ES`;

    this.http.get<IMovie>(url)
      .subscribe((response) => {
        this._title = response.title;
        this._poster_path = response.poster_path;
        this._release_date = response.release_date;
        this._vote_average = response.vote_average;
        this._vote_count = response.vote_count;
        console.log("[getMovieData] -> datos de la peli obtenidos");
      }, err => {
        console.log("[getMovieData] -> Error al obtener los datos de la peli:" + err);
      })
  }

  async addToWatchlist() {
    
    if (this.userIsLoggued == true) {
      //Saving in Firestore
      try {
        
        /*FUNCIONA: guarda en la DB
        const docRef = await addDoc(collection(db, "watchlist"), {
          //Data saved in Firestore:
          user_uid: this.userUID,
          movie_id: this.movieId,
          movie_title: this._title,
          movie_poster_path: this._poster_path,
          movie_release_date: this._release_date,
          movie_vote_average: this._vote_average,
          movie_vote_count: this._vote_count,
        });*/

        await setDoc(doc(db, "watchlist", this.userUID+this.movieId), {
          user_uid: this.userUID,
          movie_id: this.movieId,
          movie_title: this._title,
          movie_poster_path: this._poster_path,
          movie_release_date: this._release_date,
          movie_vote_average: this._vote_average,
          movie_vote_count: this._vote_count,
        });

      } catch (e) {
        console.error("[addToWatchlist] -> Error adding document: ", e);
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
