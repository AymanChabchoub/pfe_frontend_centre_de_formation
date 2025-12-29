import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSessionFormationByFormationIdComponent } from './liste-session-formation-by-formation-id.component';

describe('ListeSessionFormationByFormationIdComponent', () => {
  let component: ListeSessionFormationByFormationIdComponent;
  let fixture: ComponentFixture<ListeSessionFormationByFormationIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeSessionFormationByFormationIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSessionFormationByFormationIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
