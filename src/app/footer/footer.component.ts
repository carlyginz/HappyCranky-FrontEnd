import { Component, OnInit } from '@angular/core';
import { MoodService } from './../services/mood.service';
import { AuthService } from './../services/auth.service';
// import { User } from '../models/user.model';
// import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public auth: AuthService, private moodService: MoodService) { }

  ngOnInit(): void {
  }

}
