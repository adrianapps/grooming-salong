import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Visit } from '../models/visit.model';
import {Dog} from '../models/dog.model';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  baseUrl = environment.apiUrl
  private visitSubject = new BehaviorSubject<Visit[]>([]);
  visit$ = this.visitSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.baseUrl}/visits/`);
  }

  createVisit(visitData: FormData): Observable<Visit> {
    return this.http.post<Visit>(`${this.baseUrl}/visits/`, visitData);
  }

  getVisit(visitId: number): Observable<Visit> {
    return this.http.get<Visit>(`${this.baseUrl}/visits/${visitId}/`);
  }

  deleteVisit(visitId: number): Observable<Visit> {
    return this.http.delete<Visit>(`${this.baseUrl}/visits/${visitId}/`).pipe(
      tap(() => {
        const currentVisits = this.visitSubject.value
        const updatedVisits = currentVisits.filter(visit => visit.id !== visitId)
        this.visitSubject.next(updatedVisits);
      })
    );
  }

  addVisit(newVisit: Visit): void {
    const currentVisits = this.visitSubject.value;
    this.visitSubject.next([...currentVisits, newVisit]);
  }

  loadVisits(): void {
    this.getVisits().subscribe((data) => {
      this.visitSubject.next(data);
    });
  }

  getDogVisits(dogId: number): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.baseUrl}/dogs/${dogId}/visits/`);
  }
}
