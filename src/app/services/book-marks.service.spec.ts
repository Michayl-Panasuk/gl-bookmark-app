import { TestBed } from '@angular/core/testing';

import { BookMarksService } from './book-marks.service';

describe('BookMarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookMarksService = TestBed.get(BookMarksService);
    expect(service).toBeTruthy();
  });
});
