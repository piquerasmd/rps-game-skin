import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOptionsComponent } from './player-options.component';
import { Choice } from '../../models/game.enums';

describe('PlayerOptionsComponent', () => {
  let component: PlayerOptionsComponent;
  let fixture: ComponentFixture<PlayerOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected choice when selectChoice is called', () => {
    spyOn(component.choiceSelected, 'emit');
    const testChoice = Choice.Rock;
    component.selectChoice(testChoice);
    expect(component.choiceSelected.emit).toHaveBeenCalledWith(testChoice);
  });
});
