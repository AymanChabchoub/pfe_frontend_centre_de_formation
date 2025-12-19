import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpNavComponent } from './up-nav.component';

describe('UpNavComponent', () => {
  let component: UpNavComponent;
  let fixture: ComponentFixture<UpNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
