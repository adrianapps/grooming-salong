import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogTableComponent } from './dog-table.component';

describe('DogTableComponent', () => {
  let component: DogTableComponent;
  let fixture: ComponentFixture<DogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
