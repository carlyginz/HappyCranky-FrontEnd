import { AuthService } from './auth.service';
import { Entry } from './entry.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MoodService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  // We will never get allllll the entries from every user?
  // getAllEntries(): Observable<Entry[]> {
  //   return this.http.get<Entry[]>('https://happy-cranky.herokuapp.com/entries')
  // }

  // getUserEntries(userId: string): Observable<Entry[]> {
  // }

  //Need the endpoint for deleting specific item
  // deleteEntry(userId: string, entryId: number, userId: string): Observable<Entry[]> {
  //   return this.http.delete<Entry[]>('https://happy-cranky.herokuapp.com/entries')
  // }

  //Need the endpoint for adding 
  // addEntry(userId: string, entryItem: Entry): Observable<Entry[]> {
  //   return this.http.post<Entry[]>('https://happy-cranky.herokuapp.com/entries', entryItem)
  // }


  // getAllActivities(userId: string): Observable<> {
  //   return this.http.get<>('https://happy-cranky.herokuapp.com/activities')
  // }
}
