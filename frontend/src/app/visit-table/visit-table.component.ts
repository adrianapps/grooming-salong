import {Component, Input, OnInit} from '@angular/core';
import {Dog} from '../models/dog.model';
import {DogService} from '../services/dog.service';
import {Visit} from '../models/visit.model';
import {VisitService} from '../services/visit.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-visit-table',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './visit-table.component.html',
  styleUrl: './visit-table.component.css'
})
export class VisitTableComponent {
  @Input() visits: Visit[] = [];
  @Input() showDeleteButton: boolean = false;

  constructor(private visitService: VisitService) {}

  deleteVisit(id: number): void {
    this.visitService.deleteVisit(id).subscribe(() => {
      console.log(`Visit with ID ${id} has been deleted`)
    })
  }
}
