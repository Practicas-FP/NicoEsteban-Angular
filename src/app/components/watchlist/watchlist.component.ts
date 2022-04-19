import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMovie } from 'src/app/interfaces/movie.interface';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { addDoc, deleteField, doc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";


//FIRESTORE:
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  movie!: IMovie;
  watchlist: any[] = [];
  userUID: string = "";
  movieDeleted: boolean = false;
  movieDeletedTitle: string = "";

  //Pagination
  p: number = 1;

  constructor() { }

  ngOnInit(): void {

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userUID = user.uid;
        this.getUsersWatchlist();
      } else {
        this.userUID = "";
      }
    })
  }

  async getUsersWatchlist() {
    //Obtaining user's whatchlist form Firestore:
    const q = query(collection(db, "watchlist"), where("user_uid", "==", this.userUID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.movie = {
        id: doc.get("movie_id"),
        title: doc.get("movie_title"),
        poster_path: doc.get("movie_poster_path"),
        release_date: doc.get("movie_release_date"),
        vote_average: doc.get("movie_vote_average"),
        vote_count: doc.get("movie_vote_count"),
        original_language: "",
        overview: "",
        runtime: "",
        genres: "",
      }
      this.watchlist.push(this.movie)
    });
  }

  async delete(movieId: string) {
    console.log("BORRAR: " + movieId);

    try {
      await deleteDoc(doc(db, "watchlist", this.userUID+movieId));
      this.movieDeleted = true;
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (e) {
      console.error("[delete()] -> Error al borrar película: ", e);
    }
  }

}
