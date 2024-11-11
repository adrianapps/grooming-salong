import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroomingService } from '../grooming.service';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-visit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './visit-form.component.html',
  styleUrl: './visit-form.component.css'
})
export class VisitFormComponent implements OnInit {
  visitForm!: FormGroup;
  dogs: any[] = [];  // Lista dostępnych psów
  services: any[] = [];  // Lista dostępnych usług
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private groomingService: GroomingService
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
    this.groomingService.getDogs().subscribe(dogs => {
      this.dogs = dogs;
    });
  }

  loadServices() {
    this.groomingService.getServices().subscribe(services => {
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
      this.groomingService.createVisit(formData).subscribe(
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
