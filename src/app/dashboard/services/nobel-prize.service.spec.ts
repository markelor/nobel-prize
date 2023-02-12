import { TestBed } from '@angular/core/testing';
import { NobelPrizeService } from './nobel-prize.service';


describe('NobelPrizeService', () => {
  let service: NobelPrizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NobelPrizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
