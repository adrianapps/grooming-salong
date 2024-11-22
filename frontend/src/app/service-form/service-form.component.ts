import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css'
})
export class ServiceFormComponent {
  serviceForm: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService 
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(1000)],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    console.log('Form controls:', this.serviceForm.controls);
  }
  

  onSubmit() {
    if (this.serviceForm.valid) {
      console.log('Form Value:', this.serviceForm.value); // Dodajemy log do sprawdzenia
      this.serviceService.createService(this.serviceForm.value).subscribe(
        response => {
          console.log('Service created:', response);
          alert('Usługa została dodana!');
          this.serviceForm.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Form is invalid:', this.serviceForm);
    }
  }
}
