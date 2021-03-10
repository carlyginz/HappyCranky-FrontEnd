import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// id: string = "";
//   ngOnInit(): void {
//     this.auth.user$.subscribe(user => {
//       this.id = user.uid;
//       // console.log(this.id); YES
//       this.getUserEntries();
//     })
//   }
