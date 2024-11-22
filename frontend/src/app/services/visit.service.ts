import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Visit } from '../models/visit.model';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.baseUrl}/visits/`);
  }

  createVisit(visitData: FormData): Observable<Visit> {
    return this.http.post<Visit>(`${this.baseUrl}/visits/`, visitData);
  }

  getVisit(visitId: number): Observable<Visit> {
    return this.http.get<Visit>(`${this.baseUrl}/visits/${visitId}/`);
  }

  updateVisit(visitId: number, visitData: FormData): Observable<Visit> {
    return this.http.put<Visit>(`${this.baseUrl}/visits/${visitId}/`, visitData);
  }

  deleteVisit(visitId: number): Observable<Visit> {
    return this.http.delete<Visit>(`${this.baseUrl}/visits/${visitId}/`);
  }
}
