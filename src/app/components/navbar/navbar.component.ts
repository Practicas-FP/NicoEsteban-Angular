import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";


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

  constructor() { }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userIsLoggued = true;
      } else {
        this.userIsLoggued = false;
      }
    })
  }

  async prueba() {

    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async prueba2() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async leer() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  onLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.userIsLoggued = false;
    });
  }

}
