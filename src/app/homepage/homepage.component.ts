import { RouterModule } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public auth: AuthService) { }

  id: string = "";
  ngOnInit(): void {
    console.log("OKAY"); //yes
    this.auth.user$.subscribe(user => {
      console.log("wtf"); //yes
      this.id = user.uid;
      console.log(this.id) //YES
    })


  }

}
