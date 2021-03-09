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
  userEntries: Entry[];

  ngOnInit(): void {
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


  deleteEntry(index) {
    console.log(index);
    // this.moodService.entries.splice(index, 1);
    //refresh page
  }

}