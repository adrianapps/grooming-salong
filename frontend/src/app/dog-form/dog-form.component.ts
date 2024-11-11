import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroomingService } from '../grooming.service';
import { ReactiveFormsModule } from '@angular/forms'; // Zaimportuj ReactiveFormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dog-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dog-form.component.html',
  styleUrl: './dog-form.component.css'
})
export class DogFormComponent {
  dogForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private groomingService: GroomingService
  ) {
    this.dogForm = this.fb.group({
      name: ['', Validators.required],
      breed: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      photo: ['']
    });
  }

  onSubmit() {
    if (this.dogForm.valid) {
      const formData = new FormData();
      formData.append('name', this.dogForm.get('name')?.value);
      formData.append('breed', this.dogForm.get('breed')?.value);
      formData.append('age', this.dogForm.get('age')?.value);
      const photo = this.dogForm.get('photo')?.value;
      if (photo) {
        formData.append('photo', photo, photo.name);
      }
  
      this.groomingService.createDog(formData).subscribe(
        response => {
          console.log('Dog created:', response);
          console.log(formData)
          this.successMessage = "Pies został dodany!";
          alert('Pies został dodany!');
          this.dogForm.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
}
