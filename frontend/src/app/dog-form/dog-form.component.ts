import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DogService } from '../services/dog.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { DogTableComponent } from '../dog-table/dog-table.component';

@Component({
  selector: 'app-dog-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DogTableComponent],
  templateUrl: './dog-form.component.html',
  styleUrl: './dog-form.component.css'
})
export class DogFormComponent {
  dogForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dogService: DogService 
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
      
      // Sprawdzamy, czy plik został wybrany i dodajemy go do FormData
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      } else {
        console.error('Nie wybrano pliku zdjęcia');
      }
  
      this.dogService.createDog(formData).subscribe(
        response => {
          this.successMessage = "Pies został dodany!";
          this.dogService.addDog(response);
          this.dogForm.reset();
          this.imagePreview = null;
          this.selectedFile = null; // Resetujemy wybrany plik po wysłaniu formularza
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Wystąpił błąd przy dodawaniu psa.';
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // Zapisuje wynik do zmiennej, która trzyma obraz
      };
      reader.readAsDataURL(file);  // Wczytuje plik jako URL
  
      // Przechowujemy plik w zmiennej
      this.selectedFile = file;
    }
  }
}
