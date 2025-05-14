import { Component, effect, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { baseUrl } from '../../global/baseUrl';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() set dataSend(value: string) {
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
  submenu: { index: string; name: string; url: string }[] = [];

  readonly selected = signal('');

  constructor() {
    effect(() => {
      const val = this.selected();
      if (val) {
        fetch(baseUrl + val)
          .then((res) => res.json())
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      }
    });
  }
}
