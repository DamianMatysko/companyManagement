import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsTaskComponent } from './show-details-task.component';

describe('ShowDetailsTaskComponent', () => {
  let component: ShowDetailsTaskComponent;
  let fixture: ComponentFixture<ShowDetailsTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailsTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
