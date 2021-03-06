import { MoodService } from './../services/mood.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feelingtoday',
  templateUrl: './feelingtoday.component.html',
  styleUrls: ['./feelingtoday.component.css']
})
export class FeelingtodayComponent implements OnInit {

  constructor(private auth: AuthService, moodService: MoodService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      console.log("wtf");
      id: user.uid;
    })

  }

}

