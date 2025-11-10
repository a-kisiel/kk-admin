import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesListComponent } from './list.component';

describe('PiecesListComponent', () => {
  let component: PiecesListComponent;
  let fixture: ComponentFixture<PiecesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiecesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiecesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
