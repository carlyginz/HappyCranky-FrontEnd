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

  constructor(public auth: AuthService, private moodService: MoodService) { }
  
  mood: number = 3;
  entrydate: string = "";
  entrytime: string = "";
  journalentry: string = "";
  UserId: string = "";
  newEntryId: number = 0;
  entryToEdit: any = {}
  // exsistingEntryId: number = this.item.id;

  get activityArray(): Activity[] {
    return this.moodService.activityArray;
  }
  get clickedEntry(): any {
    return this.moodService.clickedEntry;
  }
  activityList = [];

  ngOnInit(): void {

    this.getCurrentDate();
    this.getCurrentTime();

    this.entryToEdit = this.moodService.clickedEntry;

    if (this.entryToEdit.id !== undefined) {
      this.mood = this.entryToEdit.mood;
      this.entrydate = this.entryToEdit.entrydate;
      this.entrytime = this.entryToEdit.entrytime;
      this.journalentry = this.entryToEdit.journalentry;
      this.UserId = this.entryToEdit.UserId;

      this.moodService.getAllEntryActivitiesPerEntryId(this.entryToEdit.id).subscribe(result => {
        console.log(result);
        result.forEach(element => {
          this.activityList.push(element.activity_id);
        });
        console.log(this.activityList);
      });

    }
    console.log(this.entryToEdit.id);

    this.moodService.getActivities().subscribe(result => {
      if (this.moodService.activityArray.length === 0) {
        result.forEach((activity: Activity) => {
          this.moodService.activityArray.push(activity);
        });
     }
    })
  }

  getCurrentDate() {
    let currentDate = new Date();
    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
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
      this.activityList.push(id);
      } else {
      const index = this.activityList.findIndex(list => list == id);
      this.activityList.splice(index, 1);
    }
    console.log(this.activityList);
  }

  addNewEntry() {
    this.auth.user$.subscribe(user => {

      this.UserId = user.uid;

      let newEntry: Entry = {
        mood: this.mood,
        entrydate: this.entrydate,
        entrytime: this.entrytime,
        journalentry: this.journalentry,
        user_id: this.UserId
      }

      console.log(newEntry);

      this.moodService.addNewEntry(newEntry).subscribe(result => {
        let emptyMood = "";
        let emptyEntryDate = "";
        let emptyEntrytime = "";
        let emptyJournalentry = "";
    
        this.moodService.getUserEntries(emptyMood, emptyEntryDate, emptyEntrytime, emptyJournalentry, this.UserId).subscribe(result => {
          let newEntryIndex = result.length - 1;
          this.newEntryId = result[newEntryIndex].id;

          console.log(newEntryIndex);
          console.log(this.newEntryId);

          this.activityList.forEach(activity => {
            let newEntryActivity: EntryActivity = {
              entry_id: this.newEntryId,
              activity_id: activity
            }
            console.log(newEntryActivity);
            this.moodService.addEntryActivities(newEntryActivity).subscribe(result => {
              console.log(result);
            });    
          });
        })
      });      
    });
  }

  updateEntry() {
    this.auth.user$.subscribe(user => {
      this.UserId = user.uid;

      let entryObject: Entry = {
        mood: this.mood,
        entrydate: this.entrydate,
        entrytime: this.entrytime,
        journalentry: this.journalentry,
        user_id: this.UserId
      }
      console.log(entryObject);

      this.moodService.updateEntry(this.entryToEdit.id, entryObject).subscribe(result => {
        
        console.log(result);

        console.log(this.entryToEdit.id);

      })
    })
  }
}

