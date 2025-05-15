import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title = '';
  @Input() isOpen = false;
  @Input() selectedRoute: { id: string; url: string; res: string } | null =
    null;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
