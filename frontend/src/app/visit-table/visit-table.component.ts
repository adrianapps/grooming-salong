import { Component } from '@angular/core';
import {Dog} from '../models/dog.model';
import {DogService} from '../services/dog.service';
import {Visit} from '../models/visit.model';
import {VisitService} from '../services/visit.service';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-visit-table',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './visit-table.component.html',
  styleUrl: './visit-table.component.css'
})
export class VisitTableComponent {
  visits: Visit[] = [];

  constructor(private visitService: VisitService) {}

  ngOnInit(): void {
    this.visitService.visit$.subscribe((data: Visit[]) => {
      this.visits = data;
    console.log('Visits Data:', JSON.stringify(this.visits, null, 2));    });
    this.visitService.loadDogs();
  }

  deleteVisit(id: number): void {
    this.visitService.deleteVisit(id).subscribe(() => {
      console.log(`Visit with ID ${id} has been deleted`)
    })
  }
}
