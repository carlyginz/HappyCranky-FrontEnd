import { MoodService } from './../services/mood.service';
import { User } from './../services/user.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public auth: AuthService, private moodService: MoodService) { }
  //, public router: Router

  id: string = "";
  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.id = user.uid;
    })
    this.getUserEntries();
  }

  getUserEntries() {
    this.moodService.getUserEntries().subscribe(result => {
      console.log(result);
    })
  }

  // checkLoginStatus() {
  //   if (this.id) {
  //     this.router.navigate(["/feelingtoday"]);
  //     return true;
  //   }
  //   return false;
  // }

}
