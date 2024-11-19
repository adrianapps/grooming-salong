import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DogService } from '../services/dog.service';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { VisitService } from '../services/visit.service';
import { ServiceService } from '../services/service.service';
import { Dog } from '../models/dog.model';
import { Service } from '../models/service.model';


@Component({
  selector: 'app-visit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './visit-form.component.html',
  styleUrl: './visit-form.component.css'
})
export class VisitFormComponent implements OnInit {
  visitForm!: FormGroup;
  dogs: Dog[] = [];  // Lista dostępnych psów
  services: Service[] = [];  // Lista dostępnych usług
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    private dogService: DogService,
    private serviceService: ServiceService,
  ){}

  // Metoda do pobierania dostępnych usług z backendu
  ngOnInit(): void {
    // Inicjalizacja formularza
    this.visitForm = this.fb.group({
      date: ['', [Validators.required]],
      description: [''],
      services: [[], Validators.required],  // Usługi
      dog: ['', Validators.required]  // Pies
    });

    // Ładowanie psów i usług z serwera
    this.loadDogs();
    this.loadServices();
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
      // Tworzenie obiektu FormData
      const formData = new FormData();
      
      // Dodawanie pól do FormData
      formData.append('date', this.visitForm.get('date')?.value);
      formData.append('description', this.visitForm.get('description')?.value || "");
      
      // Usługi - przekazanie wybranych usług
      const selectedServices = this.visitForm.get('services')?.value;
      if (selectedServices && selectedServices.length > 0) {
        selectedServices.forEach((serviceId: number) => {
          formData.append('services', serviceId.toString());  // Przekazujemy ID usług
        });
      }

      // Pies - przekazanie psa
      const selectedDog = this.visitForm.get('dog')?.value;
      if (selectedDog) {
        formData.append('dog', selectedDog.toString());  // Przekazujemy ID psa
      }

      // Sprawdzenie, co dokładnie wysyłasz
      console.log('Data wysyłane do API:', formData);

      // Przesyłanie danych do API
      this.visitService.createVisit(formData).subscribe(
        (response) => {
          console.log('Wizyta utworzona:', response);
          this.successMessage = 'Wizyta została pomyślnie zarezerwowana!';
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
