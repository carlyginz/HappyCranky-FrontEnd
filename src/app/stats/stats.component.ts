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
 

 

  constructor(private moodService: MoodService, private router: Router, private route: ActivatedRoute) { }

  
    

  ngOnInit(): void {
    this.moodService.getUserStats().subscribe((entries: Entry[]) => {
      this.entries = entries;
    });
  }


   
getEntryPage() {
  this.router.navigate(['/entrypage']);
}


}
