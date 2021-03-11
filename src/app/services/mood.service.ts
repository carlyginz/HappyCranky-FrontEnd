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

  activityArray: Activity[] = [];

  constructor(private http: HttpClient, private auth: AuthService) { }

 

  apiURL: string = `https://happy-cranky.herokuapp.com/entries`;

  //get entries by any parameter
  getUserEntries(moodVar: string, entryDate: string, entryTime: string, journalEntry: string, userId?: string): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiURL, {
      params: { mood: moodVar, entrydate: entryDate, entrytime: entryTime, journalentry: journalEntry, user_id: userId }
    })
  }

  getEntriesOnlyByUserId(userId?: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL, {
      params: { user_id: userId }
    })
  }
 
getUserStats(moodVar?: string, userId?: string):  Observable<Entry[]> {
  
  return this.http.get<Entry[]> (this.apiURL, {
    params: {  mood: moodVar, user_id: userId }
  });
}






// getStats(queryParams: any): Observable<any> {
//   let parameters: any = {
//     api_Url: this.apiURL,
//   };
//   if (queryParams.moodVar) {
//     parameters.moodVar = queryParams.moodVar;
//   }
//   if (queryParams.userID) {
//     parameters.userID = queryParams.userID;
//   }
 
//   return this.http.get (this.apiURL, {
//         params: parameters,
//       });
//       console.log (parameters)
// }



  // entryDate: string, entryTime: string, journalEntry: string, 
  // mood: mood, entrydate: entryDate, entrytime: entryTime, journalentry: journalEntry,

  deleteEntry(itemId: number): Observable<Entry[]> {
    return this.http.delete<Entry[]>(this.apiURL + `/${itemId}`);
  }

  addNewEntry(newEntry: Entry): Observable<Entry[]> {
    return this.http.post<Entry[]>(this.apiURL, newEntry);
  }

  getAllEntryActivitiesPerEntryId(entryId: string): Observable<any> {
    return this.http.get<any[]>(`https://happy-cranky.herokuapp.com/entryactivities`, {
      params: { entry_id: entryId }
    })
  }

  deleteEntryFromEA(eaId: number): Observable<Entry[]> {
    return this.http.delete<Entry[]>(`https://happy-cranky.herokuapp.com/entryactivities/${eaId}`);
  }

  addEntryActivities(entryActivity: EntryActivity): Observable<EntryActivity[]> {
    return this.http.post<EntryActivity[]>('https://happy-cranky.herokuapp.com/entryactivities', entryActivity)
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>('https://happy-cranky.herokuapp.com/activities')
  }
}
  // getUserActivities(userId: string): Observable<> {
  //   return this.http.get<>('https://happy-cranky.herokuapp.com/activities')
  // }

