import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Service } from '../models/service.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-table.component.html',
  styleUrl: './service-table.component.css',
})
export class ServiceTableComponent {
  services: Service[] = [];

  constructor(private servicesService: ServiceService) {}

  ngOnInit(): void {
    this.servicesService.service$.subscribe((data: Service[]) => {
      this.services = data;
    });
    this.servicesService.loadServices();
  }

  deleteService(id: number): void {
    this.servicesService.deleteService(id).subscribe(() => {
      console.log(`Service with ID ${id} has been deleted`)
    })
  }
}
