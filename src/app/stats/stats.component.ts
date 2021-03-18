import { EidAname } from './../models/eid-aname';
import { Activity } from './../models/activity';
import { Component, OnInit } from '@angular/core';
import { MoodService } from '../services/mood.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Entry } from '../models/entry.model';
import { AuthService } from './../services/auth.service';
import { ThisReceiver } from '@angular/compiler';
import { EntryActivity } from '../models/entryactivity';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  userEntries: Entry[] = [];
  userEntriesD: Entry[] = [];
  userId: string = '';
  mood = 0;
  selctedUser = [];
  userDetails = [];
  happyDays = [];
  sadDays = [];
  happyActivitiesIds = [];
  sadActivitiesIds = [];
  HappyActivitiesNamesandCategories: EidAname[] = [];
  SadActivitiesNamesandCategories: EidAname[] = [];
  AllActivities: Activity[];
  ActivitySelected: Number;

  get clickedEntry(): any {
    return this.moodService.clickedEntry;
  }

  constructor(
    private moodService: MoodService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.displayEntries();

    this.moodService.getAllActivities().subscribe((data) => {
      this.AllActivities = data;
    });
  }

  onActivitySelected(selectedUserId: any): void {
    this.moodService.getAllEntries(selectedUserId).subscribe((data) => {
      this.userEntries = data;
    });
  }

  displayEntries() {
    let mood: any = '';
    let entrydate: string = '';
    let entrytime: string = '';
    let journalentry: string = '';
    this.auth.user$.subscribe((user) => {
      this.userId = user.uid;
      let userID: string = this.userId;
      this.moodService
        .getUserEntries(mood, entrydate, entrytime, journalentry, userID)
        .subscribe((result) => {
          this.userEntriesD = result;
        });
    });
  }

  happyDaysDidThis() {
    this.SadActivitiesNamesandCategories = [];
    let i = 0;
    this.happyDays = [];
    this.happyActivitiesIds = [];
    this.userEntriesD.forEach((element) => {
      if (element.mood === 5 || element.mood === 4) {
        this.happyDays.push(element.id);
      }
    });
    let newHEId;
    let newHAId;
    let newHObject: EidAname;
    this.happyDays.forEach((element) => {
      this.moodService
        .getAllEntryActivitiesPerEntryId(element)
        .subscribe((result) => {
          if (result.length > 0) {
            this.HappyActivitiesNamesandCategories = [];
            for (i = 0; i < result.length; i++) {
              newHEId = result[i].entry_id;
              newHAId = result[i].activity_id;
              this.moodService
                .getActivityNameAndCategory(newHAId)
                .subscribe((newResult: any) => {
                  newHObject = {
                    aName: newResult.name,
                    aCategory: newResult.category,
                  };
                  this.HappyActivitiesNamesandCategories.push(newHObject);
                });
            }
          }
        });
    });
  }

  sadDaysDidThis() {
    this.HappyActivitiesNamesandCategories = [];
    let i = 0;
    this.sadDays = [];
    this.sadActivitiesIds = [];
    this.userEntriesD.forEach((element) => {
      if (element.mood === 1 || element.mood === 2) {
        this.sadDays.push(element.id);
      }
    });
    let newSEId;
    let newSAId;
    let newSObject: EidAname;
    this.sadDays.forEach((element) => {
      this.moodService
        .getAllEntryActivitiesPerEntryId(element)
        .subscribe((result) => {
          if (result.length > 0) {
            this.SadActivitiesNamesandCategories = [];
            for (i = 0; i < result.length; i++) {
              newSEId = result[i].entry_id;
              newSAId = result[i].activity_id;
              this.moodService
                .getActivityNameAndCategory(newSAId)
                .subscribe((newResult: any) => {
                  newSObject = {
                    aName: newResult.name,
                    aCategory: newResult.category,
                  };
                  this.SadActivitiesNamesandCategories.push(newSObject);
                });
            }
          }
        });
    });
  }

}
