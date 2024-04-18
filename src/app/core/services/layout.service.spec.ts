import { TestBed } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { AnyARecord } from 'dns';

describe('LayoutService', () => {
  let service: LayoutService;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(() => {
    breakpointObserver = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    TestBed.configureTestingModule({
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserver }
      ]
    });
    breakpointObserver.observe.and.returnValue(of({ matches: true } as any));
  });

  it('should be created', () => {
    service = TestBed.inject(LayoutService);
    expect(service).toBeTruthy();
  });

  it('should consider device as mobile when width is less than or equal to 600px', () => {
    // Simulate a breakpoint state indicating a match for mobile
    const breakpointState: any = { matches: true };
    breakpointObserver.observe.and.returnValue(of(breakpointState));
    service = TestBed.inject(LayoutService);

    service.isMobile$.subscribe(isMobile => {
      expect(isMobile).toBeTrue();
    });
  });

  it('should not consider device as mobile when width is greater than 600px', () => {
    // Simulate a breakpoint state indicating no match for mobile
    const breakpointState: any = { matches: false };
    breakpointObserver.observe.and.returnValue(of(breakpointState));
    service = TestBed.inject(LayoutService);

    service.isMobile$.subscribe(isMobile => {
      expect(isMobile).toBeFalse();
    });
  });
});
