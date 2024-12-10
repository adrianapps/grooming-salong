import {Component, Input} from '@angular/core';
import {VisitTableComponent} from '../visit-table/visit-table.component';
import {Visit} from '../models/visit.model';
import {DogService} from '../services/dog.service';
import {VisitService} from '../services/visit.service';
import {ActivatedRoute} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dogs-visits-table',
  standalone: true,
  imports: [VisitTableComponent, NgIf],
  templateUrl: './dogs-visits-table.component.html',
  styleUrl: './dogs-visits-table.component.css'
})
export class DogsVisitsTableComponent {
  visits: Visit[] = [];
  dogId: number | null = null

  constructor(private visitService: VisitService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.dogId = +this.route.snapshot.paramMap.get('id')!;
    if (this.dogId) {
    this.visitService.getDogVisits(this.dogId).subscribe((data: Visit[]) => {
      this.visits = data;
      console.log(`Visits by dog ID ${this.dogId}: ${JSON.stringify(this.visits)}`)
    });
  }
}}
