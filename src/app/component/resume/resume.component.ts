import { Component, Input } from '@angular/core';
import { Races } from '../../utils/Races';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent {
  @Input() payloadRaces: Races | null = {
    index: '',
    name: '',
    speed: 0,
    ability_bonuses: [],
    alignment: '',
  };
}
