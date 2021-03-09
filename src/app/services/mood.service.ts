import { AuthService } from './auth.service';
import { Entry } from '../models/entry.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MoodService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  apiURL: string = `https://happy-cranky.herokuapp.com/entries`;

  //get entries by any parameter
  getUserEntries(moodVar?: string, entryDate?: string, entryTime?: string, journalEntry?: string, userId?: string): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiURL, {
      params: { mood: moodVar, entrydate: entryDate, entrytime: entryTime, journalentry: journalEntry, user_id: userId }
    })
  }

  deleteEntry(itemId: number): Observable<Entry[]> {
    return this.http.delete<Entry[]>(this.apiURL + `/${itemId}`);
  }


  //Need the endpoint for adding 
  // addEntry(userId: string, entryItem: Entry): Observable<Entry[]> {
  //   return this.http.post<Entry[]>('https://happy-cranky.herokuapp.com/entries', entryItem)
  // }

  //Need the endpoint for activities
  // getUserActivities(userId: string): Observable<> {
  //   return this.http.get<>('https://happy-cranky.herokuapp.com/activities')
  // }
}
