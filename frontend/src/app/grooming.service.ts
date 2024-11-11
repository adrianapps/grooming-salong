import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Komunikacja z API
export class GroomingService {
  private baseUrl = 'http://localhost:8000/api';  // Adres API Django

  constructor(private http: HttpClient) {}

  // Obsługa dla `Service`
  getServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/services/`);
  }

  createService(service: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/services/`, service);
  }

  // Obsługa dla `Dog`
  getDogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dogs/`);
  }

  createDog(dog: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/dogs/`, dog);
  }

  // Obsługa dla `Visit`
  getVisits(): Observable<any> {
    return this.http.get(`${this.baseUrl}/visits/`);
  }

  createVisit(visit: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/visits/`, visit);
  }
}
