import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeInscriptionBySessionIdComponent } from './liste-inscription-by-session-id.component';

describe('ListeInscriptionBySessionIdComponent', () => {
  let component: ListeInscriptionBySessionIdComponent;
  let fixture: ComponentFixture<ListeInscriptionBySessionIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeInscriptionBySessionIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeInscriptionBySessionIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
