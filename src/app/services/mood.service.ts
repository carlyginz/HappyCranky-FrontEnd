import { Entry } from './entry.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  constructor(private http: HttpClient) { }

  // We will never get allllll the entries from every user?
  // getAllEntries(): Observable<Entry[]> {
  //   return this.http.get<Entry[]>('https://happy-cranky.herokuapp.com/entries')
  // }

  //Need the endpoint for deleting specific item
  // deleteEntry(entryId: number, userId: string): Observable<Entry[]> {
  //   return this.http.delete<Entry[]>('https://happy-cranky.herokuapp.com/entries')
  // }

  //Need the endpoint for adding 
  addEntry(entryItem: Entry): Observable<Entry[]> {
    return this.http.post<Entry[]>('https://happy-cranky.herokuapp.com/entries', entryItem)
  }

  // getUserEntries(): Observable<Entry[]> {

  // }


  //do all the http.get from Heroku in here

  //reference app.component.ts for help

}
