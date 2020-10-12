import { TestBed } from '@angular/core/testing';

import { NgxRowService } from './ngx-row.service';

describe('NgxRowService', () => {
  let service: NgxRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
