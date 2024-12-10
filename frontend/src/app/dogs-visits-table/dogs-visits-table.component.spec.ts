import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsVisitsTableComponent } from './dogs-visits-table.component';

describe('DogsVisitsTableComponent', () => {
  let component: DogsVisitsTableComponent;
  let fixture: ComponentFixture<DogsVisitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogsVisitsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogsVisitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
