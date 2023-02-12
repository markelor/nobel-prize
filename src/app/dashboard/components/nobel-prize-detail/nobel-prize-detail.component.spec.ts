import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelPrizeDetailComponent } from './nobel-prize-detail.component';

describe('NobelPrizeDetailComponent', () => {
  let component: NobelPrizeDetailComponent;
  let fixture: ComponentFixture<NobelPrizeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NobelPrizeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobelPrizeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
