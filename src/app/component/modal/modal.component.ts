import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../select/select.component';
import { Races } from '../../utils/Races';

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
  @Output() categoriesSelected = new EventEmitter<Races>();

  close() {
    this.closed.emit();
  }

  onCategories(categories: Races) {
    console.log(categories);
    this.categoriesSelected.emit(categories);
  }
}
