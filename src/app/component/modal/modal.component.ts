import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../select/select.component';
import { Races } from '../../utils/Races';
import { Classes } from '../../utils/Classes';
import { Equipment } from '../../utils/Equipment';
import { Skills } from '../../utils/Skills';
import { Spells } from '../../utils/Spells';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title = '';
  @Input() isOpen = false;
  @Input() selectedRoute: { id: string; url: string; res: string } | null =
    null;
  @Output() closed = new EventEmitter<void>();
  @Output() categoriesSelected = new EventEmitter<
    Races | Classes | Equipment | Skills | Spells
  >();

  close() {
    this.closed.emit();
  }

  onCategories(categories: Races) {
    this.categoriesSelected.emit(categories);
  }
}
