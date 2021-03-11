import { Component, OnInit } from '@angular/core';
import { MoodService } from '../services/mood.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Entry } from '../models/entry.model';
import { AuthService } from './../services/auth.service';



@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {
  
  userEntries: Entry[] = [];
  userId: string = "";
  mood = 0;
  selctedUser = [];
  userDetails = [];
  


 

  constructor(private moodService: MoodService, private router: Router, private route: ActivatedRoute, private auth: AuthService) { }

  
    

  ngOnInit(): void {
  //   this.moodService.getUserStats().subscribe((userEntries: Entry[]) => {
  //     this.userEntries = userEntries;
  //   });
    this.displayEntries();
    
  // }
  }
  displayEntries() {
    let mood: any = "";
    let entrydate: string = "";
    let entrytime: string = "";
    let journalentry: string = "";
    this.auth.user$.subscribe(user => {
      this.userId = user.uid;
      let userID: string = this.userId;
      this.moodService.getUserEntries(mood, entrydate, entrytime, journalentry, userID).subscribe(result => {
        this.userEntries = result;
        console.log(this.userEntries);
      })
    })
  }



  getSelectedItem(item){
    console.log('selected items : ',item)
    this.selctedUser = this.userDetails.filter((user)=>user.displayName.includes(item))

  }


   
getEntryPage() {
  this.router.navigate(['/entrypage']);
}

// displayStats() {
//   this.moodService.getUserEntries(this.mood.toString(), this.userId).subscribe(result => {
//     console.log(result);
//   })
// }
}
