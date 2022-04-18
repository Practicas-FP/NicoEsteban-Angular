import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { environment } from 'src/environments/environment';

const app = initializeApp(environment.firebaseConfig)

@Component({
  selector: 'app-log-in.',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  loginForm = new FormGroup({
    user_email: new FormControl(""),
    user_password: new FormControl(""),
  });

  public error: boolean = false;
  public userIsLogged: boolean = false;
  public error_message: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onLogin() {
    //this.error = false;

    const user_email = this.loginForm.controls["user_email"].value;
    const user_password = this.loginForm.controls["user_password"].value;
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!user_email.match(regex)) {
      this.error = true;
      this.error_message = "Debes introducir un correo electrónico válido."
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }

    if (user_email.length == 0 || user_password.length == 0) {
      this.error = true;
      this.error_message = "Intruduce tu correo electrónico y tu contraseña."
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }

    if (this.error == false) {
      const auth = getAuth();

      //SignIn function
      signInWithEmailAndPassword(auth, user_email, user_password)
        .then((userCredential) => {
          const user = userCredential;
          this.userIsLogged = true;
          //alert("1 onLogin): Logueado correctamente | userIsLogged: " + this.userIsLogged + "userCredential: " + user);

          onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              //alert("2 onLogin): dentro de onAuthStateChanged - uid:" + uid);
            }
          })

          //alert("3 onLogin) Justo antes de redireccionar a Home");
          this.router.navigate(["/"]);
        })
        .catch((error) => {
          this.error = true;
          if (error.code == "auth/wrong-password") {
            this.error_message = "La contraseña introducida es incorrecta.";
            setTimeout(() => {
              window.location.reload();
            }, 2500);

          } else if (error.code == "auth/user-not-found") {
            this.error_message = "No existe ningún usuario con este correo electrónico.";
            setTimeout(() => {
              window.location.reload();
            }, 2500);

          }
        });
    }

  }
  //!OnLogin

}