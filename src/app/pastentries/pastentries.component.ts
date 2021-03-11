import { MoodService } from './../services/mood.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry.model';

@Component({
  selector: 'app-pastentries',
  templateUrl: './pastentries.component.html',
  styleUrls: ['./pastentries.component.css']
})
export class PastentriesComponent implements OnInit {

  constructor(public auth: AuthService, private moodService: MoodService, public router: Router) { }


  id: string = "";
  public userEntries = [];

  ngOnInit(): void {
    this.displayEntries();
  }

  displayEntries() {
    let mood: any = "";
    let entrydate: string = "";
    let entrytime: string = "";
    let journalentry: string = "";
    this.auth.user$.subscribe(user => {
      this.id = user.uid;
      let userID: string = this.id;
      this.moodService.getUserEntries(mood, entrydate, entrytime, journalentry, userID).subscribe(result => {
        this.userEntries = result;
        console.log(this.userEntries);
      })
    })
  }

  //how to pass info to this page?
  goToEntryPage() {
    this.router.navigate(['/entrypage']);
  }


  deleteEntry(item) {
    this.moodService.deleteEntry(item.id).subscribe((entries: Entry[]) => {
      this.userEntries = entries;
      this.displayEntries();
    })
    // if the ea table entry_id is equal to entries item.id, then get the ea table id and delete from ea table
    this.moodService.getAllEntryActivitiesPerEntryId(item.id).subscribe(newList => {
      newList.forEach(element => {
        let newId = element.id;
        this.moodService.deleteEntryFromEA(newId).subscribe(() => {
          console.log(`I'm deleting EA Table id = ${newId}`);
        })
      });
    })
  }

}

