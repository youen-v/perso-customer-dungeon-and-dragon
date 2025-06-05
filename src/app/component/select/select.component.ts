import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { baseUrl } from '../../global/baseUrl';
import { Races } from '../../utils/Races';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() set dataSend(value: string | undefined) {
    if (value && value.trim() !== '') {
      try {
        const parsed = JSON.parse(value);
        this.datas = parsed.results || [];
      } catch (e) {
        console.error('Erreur de parsing JSON :', e);
      }
    }
  }
  datas: { index: string; name: string; url: string }[] = [];

  @Output() categoriesPayload = new EventEmitter<Races>();

  readonly selected = signal('');

  constructor() {
    effect(() => {
      const val = this.selected();
      if (val) {
        fetch(baseUrl + val)
          .then((res) => res.json())
          .then((result) => {
            this.categoriesPayload.emit(result);
          })
          .catch((err) => console.log(err));
      }
    });
  }
}
