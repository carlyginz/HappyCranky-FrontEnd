import { Component, OnInit } from '@angular/core';
import { MoodService } from './../services/mood.service';
import { User } from '../models/user.model';
import { AuthService } from './../services/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthService, private moodService: MoodService) { }

//passing in the user id
  id: string = "";
  ngOnInit(): void {
    // this.auth.user$.subscribe(user => {
    //   this.id = user.uid;
      // console.log(this.id); YES
      // this.getUserEntries();
    // })
  }

// //how to pass info to this page?
// goToEntryPage() {
//   this.router.navigate(['/entrypage']);
// }
}


