import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services/`);
  }
}
