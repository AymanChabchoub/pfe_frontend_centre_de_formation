import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFormationListComponent } from './session-formation-list.component';

describe('SessionFormationListComponent', () => {
  let component: SessionFormationListComponent;
  let fixture: ComponentFixture<SessionFormationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionFormationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionFormationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
