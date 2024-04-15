import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isMobile$: Observable<boolean>;

  constructor(readonly breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver.observe(['(max-width: 600px)']).pipe(
      map((state: BreakpointState) => {
        if (state.matches) {
          return true;
        }
        return false;
      }),
    );
  }
}
