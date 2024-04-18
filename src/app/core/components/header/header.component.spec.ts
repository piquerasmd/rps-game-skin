import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router, provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggle event when onToggle is called', () => {
    spyOn(component.toggle, 'emit');
    component.onToggle();
    expect(component.toggle.emit).toHaveBeenCalled();
  });

  it('should navigate back when onNavigateBack is called', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.onNavigateBack();
    expect(spy).toHaveBeenCalled();
  });
});
