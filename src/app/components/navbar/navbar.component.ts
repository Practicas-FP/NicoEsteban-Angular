import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//FIRESTORE:
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userIsLoggued!: boolean;
  userUID: string = "";

  constructor() { }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userIsLoggued = true;
        this.userUID = user.uid;
      } else {
        this.userIsLoggued = false;
      }
    })
  }

  onLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.userIsLoggued = false;
    });
  }

}
