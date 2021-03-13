import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public auth: AuthService) { }

  id: any;
  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.id = user.uid;
    })
  }
}
