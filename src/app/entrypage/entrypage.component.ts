import { MoodService } from '../services/mood.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry.model';
import { Activity } from '../models/activity';
import { EntryActivity } from '../models/entryactivity';

@Component({
  selector: 'app-entrypage',
  templateUrl: './entrypage.component.html',
  styleUrls: ['./entrypage.component.css']
})
export class EntryPageComponent implements OnInit {

  constructor(public auth: AuthService, private MoodService: MoodService) { }

  mood: number = 0;
  entrydate: string = "";
  entrytime: string = "";
  journalentry: string = "";
  UserId: string = "";
  newEntryId: number = 0;

  get activityArray(): Activity[] {
    return this.MoodService.activityArray;
  }

  activityArrayForEntry;
  activityList = [];

  ngOnInit(): void {

    this.getCurrentDate();
    this.getCurrentTime();

    this.MoodService.getActivities().subscribe(result => {
      result.forEach((activity: Activity) => {
        this.MoodService.activityArray.push(activity);
      });
    })

    this.auth.user$.subscribe(user => {
      this.UserId = user.uid;
    });

  }

  getCurrentDate() {
    let currentDate = new Date();
    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = currentDate.getFullYear();
  
    this.entrydate = currentDate.toString();
    this.entrydate = mm + '/' + dd + '/' + yyyy;
  }

  getCurrentTime() {
    let currentTime = new Date().toLocaleTimeString();
    this.entrytime = currentTime.toString();
  }

  toggleActivityList(id, event) {
    const checked = event.target.checked;
    
    if (checked) {
      this.activityList.push({ activity_id: id });
      } else {
      const index = this.activityList.findIndex(list => list.activity_id == id);
      this.activityList.splice(index, 1);
    }
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

      this.MoodService.addNewEntry(newEntry).subscribe(result => {
        this.MoodService.getEntriesOnlyByUserId(this.UserId).subscribe(result => {
          let newEntryIndex = result.length - 1;
          this.newEntryId = result[newEntryIndex].id;

          this.activityList.forEach(activity => {
            let newEntryActivity: EntryActivity = {
              entry_id: this.newEntryId,
              activity_id: activity.activity_id
            }
            this.MoodService.addEntryActivities(newEntryActivity).subscribe(result => {
              console.log(result);
            });    
          });
        })
      });      
    });
  }
}

