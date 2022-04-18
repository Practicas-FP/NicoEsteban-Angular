import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopRatedMoviesComponent } from './top-rated-movies.component';

const routes: Routes = [{ path: '', component: TopRatedMoviesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopRatedMoviesRoutingModule { }
