import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EntryActivity } from '../models/entryactivity';
import { Activity } from '../models/activity';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})

export class MoodService {

  activityArray: Activity[] = []

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

  getAllEntryActivitiesPerEntryId(entryId: string): Observable<any> {
    return this.http.get<any[]>(`https://happy-cranky.herokuapp.com/entryactivities`, {
      params: { entry_id: entryId }
    })
  }

  deleteEntryFromEA(eaId: number): Observable<Entry[]> {
    return this.http.delete<Entry[]>(`https://happy-cranky.herokuapp.com/entryactivities/${eaId}`);
  }
    addNewEntry(newEntry: Entry): Observable<Entry[]> {
    return this.http.post<Entry[]>(this.apiURL, newEntry);
  }

  addEntryActivities(entryActivity: EntryActivity): Observable<EntryActivity[]> {
    return this.http.post<EntryActivity[]>('https://happy-cranky.herokuapp.com/entryactivities', entryActivity)
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>('https://happy-cranky.herokuapp.com/activities')
  }
}
