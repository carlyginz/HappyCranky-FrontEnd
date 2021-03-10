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
  
  entries: Entry[] = [];
  userId: string = "";
  mood = 0;

 

  constructor(private moodService: MoodService, private router: Router, private route: ActivatedRoute) { }

  
    

  ngOnInit(): void {
    // this.moodService.getUserStats().subscribe((entries: Entry[]) => {
    //   this.entries = entries;
    // });
    this.moodService.getActivities().subscribe(result => {
      console.log(result);
      result.forEach((activity: Activity) => {
        this.MoodService.activityArray.push(activity);
      });
      console.log(this.MoodService.activityArray);
    })
  }


   
getEntryPage() {
  this.router.navigate(['/entrypage']);
}

displayStats() {
  this.moodService.getUserEntries(this.mood.toString(), this.userId).subscribe(result => {
    console.log(result);
  })
}
}
