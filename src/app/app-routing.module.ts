import { HomepageComponent } from './homepage/homepage.component';
import { FeelingtodayComponent } from './feelingtoday/feelingtoday.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: "/homepage", pathMatch: "full" },
  { path: 'feelingtoday', component: FeelingtodayComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
