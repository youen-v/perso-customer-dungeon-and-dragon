import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../component/select/select.component';
import { ModalComponent } from '../../component/modal/modal.component';
import { baseUrl } from '../../global/baseUrl';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SelectComponent, ModalComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  ngOnInit(): void {
    for (let index = 0; index < this.routesApi.length; index++) {
      this.getRoutesApi(index);
    }
  }
  showModal = false;

  openModal() {
    this.showModal = true;
  }
  onModalClosed() {
    this.showModal = false;
    console.log(this.showModal);
  }

  routesApi = [
    { id: 'ability-scores', url: '/api/2014/ability-scores', res: '' },
    { id: 'alignments', url: '/api/2014/alignments', res: '' },
    { id: 'backgrounds', url: '/api/2014/backgrounds', res: '' },
    { id: 'classes', url: '/api/2014/classes', res: '' },
    { id: 'conditions', url: '/api/2014/conditions', res: '' },
    { id: 'damage-types', url: '/api/2014/damage-types', res: '' },
    { id: 'equipment', url: '/api/2014/equipment', res: '' },
    {
      id: 'equipment-categories',
      url: '/api/2014/equipment-categories',
      res: '',
    },
    { id: 'feats', url: '/api/2014/feats', res: '' },
    { id: 'features', url: '/api/2014/features', res: '' },
    { id: 'languages', url: '/api/2014/languages', res: '' },
    { id: 'magic-items', url: '/api/2014/magic-items', res: '' },
    { id: 'magic-schools', url: '/api/2014/magic-schools', res: '' },
    { id: 'monsters', url: '/api/2014/monsters', res: '' },
    { id: 'proficiencies', url: '/api/2014/proficiencies', res: '' },
    { id: 'races', url: '/api/2014/races', res: '' },
    { id: 'rule-sections', url: '/api/2014/rule-sections', res: '' },
    { id: 'rules', url: '/api/2014/rules', res: '' },
    { id: 'skills', url: '/api/2014/skills', res: '' },
    { id: 'spells', url: '/api/2014/spells', res: '' },
    { id: 'subclasses', url: '/api/2014/subclasses', res: '' },
    { id: 'subraces', url: '/api/2014/subraces', res: '' },
    { id: 'traits', url: '/api/2014/traits', res: '' },
    { id: 'weapon-properties', url: '/api/2014/weapon-properties', res: '' },
  ];

  async getRoutesApi(index: number) {
    let fullUrl = baseUrl + this.routesApi[index].url;

    await fetch(fullUrl)
      .then((res) => res.json())
      .then((result) => {
        this.routesApi[index].res = JSON.stringify(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
