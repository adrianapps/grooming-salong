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
  selectedFile: File | null = null; // Przechowywanie wybranego pliku

  constructor(
    private fb: FormBuilder,
    private groomingService: GroomingService
  ) {
    this.dogForm = this.fb.group({
      name: ['', Validators.required],
      breed: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      photo: [null]
    });
  }

  // Obsługa wyboru pliku
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    } else {
      this.selectedFile = null;
      console.error('No file selected');
    }
  }

  // Obsługa wysyłania formularza
  onSubmit() {
    if (this.dogForm.valid) {
      const formData = new FormData();
      formData.append('name', this.dogForm.get('name')?.value);
      formData.append('breed', this.dogForm.get('breed')?.value);
      formData.append('age', this.dogForm.get('age')?.value);

      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      } else {
        console.error('No photo selected or invalid type');
      }

      this.groomingService.createDog(formData).subscribe(
        (response) => {
          console.log('Dog created:', response);
          this.successMessage = 'Pies został dodany!';
          this.dogForm.reset();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
