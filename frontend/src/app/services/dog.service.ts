import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Dog } from '../models/dog.model';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${this.baseUrl}/dogs/`);
  }

  createDog(dogData: FormData): Observable<Dog> {
    return this.http.post<Dog>(`${this.baseUrl}/dogs/`, dogData);
  }

  getDog(dogId: number): Observable<Dog> {
    return this.http.get<Dog>(`${this.baseUrl}/dogs/${dogId}`);
  }

  updateDog(dogId: number, dogData: FormData): Observable<Dog> {
    return this.http.put<Dog>(`${this.baseUrl}/dogs/${dogId}`, dogData);
  }

  deleteDog(dogId: number): Observable<Dog> {
    return this.http.delete<Dog>(`${this.baseUrl}/dogs/${dogId}`);
  }
}
