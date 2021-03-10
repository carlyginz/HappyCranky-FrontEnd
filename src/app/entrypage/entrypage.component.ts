import { MoodService } from '../services/mood.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry.model';
import { Activity } from '../models/activity';

@Component({
  selector: 'app-entrypage',
  templateUrl: './entrypage.component.html',
  styleUrls: ['./entrypage.component.css']
})
export class EntryPageComponent implements OnInit {

  constructor(public auth: AuthService, private MoodService: MoodService) { }

  UserId: string = "";
  mood = 0;
  journalentry = "";
  entrydate = "";
  entrytime = "";

  get activityArray(): Activity[] {
    return this.MoodService.activityArray;
  }

  entryActivities: number = 0;

  ngOnInit(): void {

    this.auth.user$.subscribe(user => {
      this.UserId = user.uid;
      this.displayClickedEntry();
    });

    this.MoodService.getActivities().subscribe(result => {
      console.log(result);
      result.forEach((activity: Activity) => {
        this.MoodService.activityArray.push(activity);
      });
      console.log(this.MoodService.activityArray);
    })

    this.getCurrentDate();
    this.getCurrentTime();
  }

  getCurrentDate() {
    let currentDate = new Date();
    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = currentDate.getFullYear();
  
    this.entrydate = currentDate.toString();
    this.entrydate = mm + '/' + dd + '/' + yyyy;

    console.log(this.entrydate);
    }

    getCurrentTime() {
      let currentTime = new Date().toLocaleTimeString();
      this.entrytime = currentTime.toString();
      console.log(this.entrytime);
    }

  displayClickedEntry() {
    this.MoodService.getUserEntries(this.mood.toString(), this.entrydate, this.entrytime, this.journalentry, this.UserId).subscribe(result => {
      console.log(result);
    })
  }

  addNewEntry() {
    this.auth.user$.subscribe(user => {
      let newEntry: Entry = {
        mood: this.mood,
        entrydate: this.entrydate,
        entrytime: this.entrytime,
        journalentry: this.journalentry,
        user_id: this.UserId
      }
      this.MoodService.addNewEntry(newEntry).subscribe();
    });
  }
}

