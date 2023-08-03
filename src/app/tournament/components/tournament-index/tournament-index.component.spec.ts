import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentIndexComponent } from './tournament-index.component';

describe('TournamentIndexComponent', () => {
  let component: TournamentIndexComponent;
  let fixture: ComponentFixture<TournamentIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentIndexComponent]
    });
    fixture = TestBed.createComponent(TournamentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
