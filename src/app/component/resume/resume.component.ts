import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Races } from '../../utils/Races';
import { Classes } from '../../utils/Classes';
import { Equipment } from '../../utils/Equipment';
import { Skills } from '../../utils/Skills';
import { Spells } from '../../utils/Spells';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent {
  racesData: Races | null = null;
  classesData: Classes | null = null;
  equipmentData: Equipment | null = null;
  skillsData: Skills | null = null;
  spellsData: Spells | null = null;

  @Output() notPrevStepSelected = new EventEmitter<Number>();
  @Input() set payloadCategories(
    value: Races | Classes | Equipment | Skills | Spells | null
  ) {
    if (value !== null && 'type' in value) {
      switch (value.type) {
        case 'races':
          this.racesData = value as Races;
          this.notPrevStepSelected.emit(1);
          break;
        case 'classes':
          if (this.racesData != null) {
            this.classesData = value as Classes;
            this.notPrevStepSelected.emit(2);
          }
          break;
        case 'equipment':
          if (this.racesData != null && this.classesData != null) {
            this.equipmentData = value as Equipment;
            this.notPrevStepSelected.emit(3);
          }
          break;
        case 'skills':
          if (
            this.racesData != null &&
            this.classesData != null &&
            this.equipmentData != null
          ) {
            this.skillsData = value as Skills;
            this.notPrevStepSelected.emit(4);
          }
          break;
        case 'spells':
          if (
            this.racesData != null &&
            this.classesData != null &&
            this.equipmentData != null &&
            this.skillsData != null
          ) {
            this.spellsData = value as Spells;
            this.notPrevStepSelected.emit(5);
          }
          break;
        default:
          break;
      }
    }
  }
}
