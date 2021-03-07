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

  constructor(public auth: AuthService) { }
  //, public router: Router

  id: string = "";
  ngOnInit(): void {
    console.log("OKAY"); //yes
    this.auth.user$.subscribe(user => {
      console.log("wtf"); //yes
      this.id = user.uid;
      console.log(this.id) //YES
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
