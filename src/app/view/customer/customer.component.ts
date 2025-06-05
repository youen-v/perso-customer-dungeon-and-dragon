import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../component/select/select.component';
import { ModalComponent } from '../../component/modal/modal.component';
import { ResumeComponent } from '../../component/resume/resume.component';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { baseUrl } from '../../global/baseUrl';
import { Races } from '../../utils/Races';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SelectComponent, ResumeComponent, ModalComponent, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  ngOnInit(): void {
    for (let index = 0; index < this.routesApi.length; index++) {
      this.getRoutesApi(index);
    }

    const promises = this.routesApi.map((_, index) => this.getRoutesApi(index));
    Promise.all(promises)
      .then(() => {
        this.filterEquipement(this.routesApi[1].res);
      })
      .catch((err) => {
        console.log(`Une requête a échouée : ${err}`);
      });
  }

  name: string = '';
  readonly editingName = signal(false);

  editName() {
    this.editingName.set(true);
  }

  saveName() {
    this.editingName.set(false);
  }

  onNameKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.saveName();
      console.log(this.name);
    }
  }
  showModal = false;
  selectedRoute: {
    id: string;
    url: string;
    res: string;
    image: string;
  } = { id: '', url: '', res: '', image: '' };
  selectedCategories: Races | null = null;

  routesApi = [
    { id: 'classes', url: '/api/2014/classes', res: '', image: 'default' },
    { id: 'equipment', url: '/api/2014/equipment', res: '', image: 'default' },
    { id: 'races', url: '/api/2014/races', res: '', image: 'default' },
    { id: 'skills', url: '/api/2014/skills', res: '', image: 'default' },
    { id: 'spells', url: '/api/2014/spells', res: '', image: 'default' },
  ];

  wapons: Array<object> = [];
  waponList = [
    'battleaxe',
    'blowgun',
    'crossbow-hand',
    'crossbow-heavy',
    'crossbow-light',
    'dagger',
    'dart',
    'flail',
    'glaive',
    'greataxe',
    'greatclub',
    'greatsword',
    'halberd',
    'handaxe',
    'javelin',
    'lance',
    'light-hammer',
    'longbow',
    'longsword',
    'mace',
    'maul',
    'morningstar',
    'net',
    'pike',
    'quarterstaff',
    'rapier',
    'scimitar',
    'shortbow',
    'shortsword',
    'sickle',
    'sling',
    'spear',
    'staff',
    'trident',
    'war-pick',
    'warhammer',
    'whip',
    'wooden-staff',
    'yew-wand',
  ];
  armor: Array<object> = [];

  openModal(route: { id: string; url: string; res: string; image: string }) {
    this.selectedRoute = route;
    this.showModal = true;
  }
  onModalClosed() {
    this.selectedRoute;
    this.showModal = false;
  }

  onCategoriesSelected(categories: Races) {
    this.selectedCategories = categories;
    this.selectedRoute.image = categories?.index;
  }

  filterEquipement(result: string) {
    const filter = JSON.parse(result).results;

    for (const element of filter) {
      for (const key of this.waponList) {
        if (element.index === key) {
          this.wapons.push(element);
        }
      }
    }

    console.log(this.wapons);
    this.routesApi[1].res = JSON.stringify({ results: this.wapons });
  }

  async getRoutesApi(index: number) {
    let fullUrl = baseUrl + this.routesApi[index].url;

    await fetch(fullUrl)
      .then((res) => res.json())
      .then((result) => {
        this.routesApi[index].res = JSON.stringify(result);
        // Chercher ou la payload est émise
        // pour récupere et écrire les interfaces
        // pour faire la même chose avec toute les categorie
        console.log(this.routesApi[0].res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
