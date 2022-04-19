import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';
import { TopRatedMoviesComponent } from './components/top-rated-movies/top-rated-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

import { UpcomingMoviesModule } from './components/upcoming-movies/upcoming-movies.module';
import { PopularMoviesModule } from './components/popular-movies/popular-movies.module';
import { TopRatedMoviesModule } from './components/top-rated-movies/top-rated-movies.module';

import { MovieDetailsModule } from './components/movie-details/movie-details.module';

import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LogInModule } from './user-sesion/log-in/log-in.module';
import { SignInModule } from './user-sesion/sign-in/sign-in.module';
import { LogInComponent } from './user-sesion/log-in/log-in.component';
import { SignInComponent } from './user-sesion/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WatchlistModule } from './components/watchlist/watchlist.module';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    UpcomingMoviesComponent,
    PopularMoviesComponent,
    TopRatedMoviesComponent,
    MovieDetailsComponent,
    LogInComponent, 
    SignInComponent, 
    NavbarComponent,
    WatchlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UpcomingMoviesModule,
    PopularMoviesModule,
    TopRatedMoviesModule,
    MovieDetailsModule,
    LogInModule,
    SignInModule,
    WatchlistModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
