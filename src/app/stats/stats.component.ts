import { Component, OnInit } from '@angular/core';
import { MoodService } from '../services/mood.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Entry } from '../models/entry.model';



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
  


 

  constructor(private moodService: MoodService, private router: Router, private route: ActivatedRoute) { }

  
    

  ngOnInit(): void {
    this.moodService.getUserStats().subscribe((userEntries: Entry[]) => {
      this.userEntries = userEntries;
    });
    
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
