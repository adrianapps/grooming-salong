import { Component } from '@angular/core';
import { DogService } from '../services/dog.service';
import { Dog } from '../models/dog.model';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dog-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dog-table.component.html',
  styleUrl: './dog-table.component.css'
})
export class DogTableComponent {
  dogs: Dog[] = [];

  constructor(private dogsService: DogService) {}

  ngOnInit(): void {
    this.dogsService.dog$.subscribe((data: Dog[]) => {
      this.dogs = data;
    });
    this.dogsService.loadDogs();
  }

  deleteDog(id: number): void {
    this.dogsService.deleteDog(id).subscribe(() => {
      console.log(`Dog with ID ${id} has been deleted`)
    })
  }
}
