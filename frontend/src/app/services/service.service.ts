import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable, BehaviorSubject, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUrl = environment.apiUrl;
  private serviceSubject = new BehaviorSubject<Service[]>([]);
  service$ = this.serviceSubject.asObservable();

  constructor(private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services/`);
  }

  createService(serviceData: FormData): Observable<Service> {
    return this.http.post<Service>(`${this.baseUrl}/services/`, serviceData);
  }

  getService(serviceId: number): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/services/${serviceId}/`);
  }

  updateService(serviceId: number, serviceData: FormData): Observable<Service> {
    return this.http.put<Service>(
      `${this.baseUrl}/services/${serviceId}/`,
      serviceData
    );
  }

  deleteService(serviceId: number): Observable<Service> {
    return this.http.delete<Service>(`${this.baseUrl}/services/${serviceId}/`).pipe(
      tap(() => {
        const currentServices = this.serviceSubject.value
        const updatedServices = currentServices.filter(service => service.id !== serviceId)
        this.serviceSubject.next(updatedServices);
      })
    );
  }

  addService(newService: Service): void {
    const currentServices = this.serviceSubject.value;
    this.serviceSubject.next([...currentServices, newService]);
  }

  loadServices(): void {
    this.getServices().subscribe((data) => {
      this.serviceSubject.next(data);
    })
  }
}
