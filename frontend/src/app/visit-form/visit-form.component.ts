import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DogService } from '../services/dog.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VisitService } from '../services/visit.service';
import { ServiceService } from '../services/service.service';
import { Dog } from '../models/dog.model';
import { Service } from '../models/service.model';
import { VisitTableComponent } from '../visit-table/visit-table.component';
import { DogTableComponent } from '../dog-table/dog-table.component';
import { Visit } from '../models/visit.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, VisitTableComponent, DogTableComponent, RouterLink],
  templateUrl: './visit-form.component.html',
  styleUrl: './visit-form.component.css'
})
export class VisitFormComponent implements OnInit {
  visitForm!: FormGroup;
  dogs: Dog[] = [];
  services: Service[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  visits: Visit[] = [];

  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    private dogService: DogService,
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      date: ['', [Validators.required, this.futureDateValidator]],
      description: [''],
      services: [[], Validators.required],
      dog: ['', Validators.required]
    });

    this.visitService.visit$.subscribe((data: Visit[]) => {
      this.visits = data;
    });
    this.visitService.loadVisits();
    this.loadDogs();
    this.loadServices();
  }

  // Walidator dla daty
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    // Sprawdzenie czy data jest w przyszłości
    if (selectedDate <= currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  loadDogs() {
    this.dogService.getDogs().subscribe(dogs => {
      this.dogs = dogs;
    });
  }

  loadServices() {
    this.serviceService.getServices().subscribe(services => {
      this.services = services;
    });
  }

  onSubmit() {
    if (this.visitForm.valid) {
      const formData = new FormData();
      formData.append('date', this.visitForm.get('date')?.value);
      formData.append('description', this.visitForm.get('description')?.value || '');

      const selectedServices = this.visitForm.get('services')?.value;
      if (selectedServices && selectedServices.length > 0) {
        selectedServices.forEach((serviceId: number) => {
          formData.append('services', serviceId.toString());
        });
      }

      const selectedDog = this.visitForm.get('dog')?.value;
      if (selectedDog) {
        formData.append('dog', selectedDog.toString());
      }

      console.log('Data wysyłane do API:', formData);

      this.visitService.createVisit(formData).subscribe(
        (response) => {
          console.log('Wizyta utworzona:', response);
          this.successMessage = 'Wizyta została pomyślnie zarezerwowana!';
          this.visitService.addVisit(response);
          this.visitForm.reset();
        },
        (error) => {
          console.error('Błąd:', error);
          this.errorMessage = 'Wystąpił błąd podczas rezerwacji wizyty.';
        }
      );
    } else {
      console.error('Formularz jest niepoprawny:', this.visitForm.errors);
    }
  }
}
