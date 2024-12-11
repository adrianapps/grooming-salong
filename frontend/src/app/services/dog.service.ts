import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Dog } from '../models/dog.model';
import { Visit } from '../models/visit.model';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  baseUrl = environment.apiUrl;
  private dogSubject = new BehaviorSubject<Dog[]>([]);
  dog$ = this.dogSubject.asObservable();

  constructor(private http: HttpClient) {}

  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${this.baseUrl}/dogs/`);
  }

  createDog(dogData: FormData): Observable<Dog> {
    return this.http.post<Dog>(`${this.baseUrl}/dogs/`, dogData);
  }

  getDog(dogId: number): Observable<Dog> {
    return this.http.get<Dog>(`${this.baseUrl}/dogs/${dogId}/`);
  }

  deleteDog(dogId: number): Observable<Dog> {
    return this.http.delete<Dog>(`${this.baseUrl}/dogs/${dogId}/`).pipe(
      tap(() => {
        const currentDogs = this.dogSubject.value
        const updatedDogs = currentDogs.filter(dog => dog.id !== dogId)
        this.dogSubject.next(updatedDogs);
      })
    );
  }

  addDog(newDog: Dog): void {
    const currentDogs = this.dogSubject.value;
    this.dogSubject.next([...currentDogs, newDog]);
  }

  loadDogs(): void {
    this.getDogs().subscribe((data) => {
      this.dogSubject.next(data);
    });
  }
}
