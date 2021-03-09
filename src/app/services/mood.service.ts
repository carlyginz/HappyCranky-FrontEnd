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

  // We will never get allllll the entries from every user?
  // getAllEntries(): Observable<Entry[]> {
  //   return this.http.get<Entry[]>('https://happy-cranky.herokuapp.com/entries')
  // }

  //get entries by any parameter
  getUserEntries(moodVar?: string, entryDate?: string, entryTime?: string, journalEntry?: string, userId?: string): Observable<Entry[]> {
    console.log(userId)
    return this.http.get<Entry[]>(this.apiURL, {
      params: { mood: moodVar, entrydate: entryDate, entrytime: entryTime, journalentry: journalEntry, user_id: userId }
    })
  }

  // entryDate: string, entryTime: string, journalEntry: string, 
  // mood: mood, entrydate: entryDate, entrytime: entryTime, journalentry: journalEntry,


  //Need the endpoint for deleting specific item
  // deleteEntry(userId: string, entryId: number, userId: string): Observable<Entry[]> {
  //   return this.http.delete<Entry[]>('https://happy-cranky.herokuapp.com/entries')
  // }

  //Need the endpoint for adding 
  // addEntry(userId: string, entryItem: Entry): Observable<Entry[]> {
  //   return this.http.post<Entry[]>('https://happy-cranky.herokuapp.com/entries', entryItem)
  // }

  // getUserActivities(userId: string): Observable<> {
  //   return this.http.get<>('https://happy-cranky.herokuapp.com/activities')
  // }
}
