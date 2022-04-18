import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpcomingMoviesComponent } from './upcoming-movies.component';

const routes: Routes = [{ path: '', component: UpcomingMoviesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpcomingMoviesRoutingModule { }
