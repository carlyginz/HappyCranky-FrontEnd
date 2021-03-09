import { MoodService } from '../services/mood.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrypage',
  templateUrl: './entrypage.component.html',
  styleUrls: ['./entrypage.component.css']
})
export class EntryPageComponent implements OnInit {

  constructor(public auth: AuthService, moodService: MoodService) { }

  ngOnInit(): void {
    // console.log("OKAY")
    // this.auth.user$.subscribe(user => {
    //   console.log("wtf");
    //   id: user.uid;
    // })

  }

}

