import { Component, Input, OnInit } from '@angular/core';
import { SelectComponent } from '../../component/select/select.component';
import { ModalComponent } from '../../component/modal/modal.component';
import { ResumeComponent } from '../../component/resume/resume.component';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { baseUrl } from '../../global/baseUrl';
import { Races } from '../../utils/Races';
import { Classes } from '../../utils/Classes';
import { Equipment } from '../../utils/Equipment';
import { Skills } from '../../utils/Skills';
import { Spells } from '../../utils/Spells';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SelectComponent, ResumeComponent, ModalComponent, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  ngOnInit(): void {
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
  showModal = false;
  selectedRoute: {
    id: string;
    url: string;
    res: string;
    image: string;
  } = { id: '', url: '', res: '', image: '' };
  selectedCategories: Races | Classes | Equipment | Skills | Spells | null =
    null;
  selectedStep: Number = 0;
  selectedClasse: Classes | null = null;
  filteredSpellsJson = '';

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

  onSelectedStep(step: Number) {
    this.selectedStep = step;
  }

  async openModal(
    route: { id: string; url: string; res: string; image: string },
    selectedStep: Number
  ) {
    switch (selectedStep) {
      case 0:
        if (route.id == 'races') {
          this.selectedRoute = route;
          this.showModal = true;
        }
        break;
      case 1:
        if (route.id == 'races' || route.id == 'classes') {
          this.selectedRoute = route;
          this.showModal = true;
        }
        break;
      case 2:
        if (
          route.id == 'races' ||
          route.id == 'classes' ||
          route.id == 'equipment'
        ) {
          this.selectedRoute = route;
          this.showModal = true;
        }
        break;
      case 3:
        if (
          route.id == 'races' ||
          route.id == 'classes' ||
          route.id == 'equipment' ||
          route.id == 'skills'
        ) {
          this.selectedRoute = route;
          this.showModal = true;
        }
        break;
      case 4:
        if (
          route.id == 'races' ||
          route.id == 'classes' ||
          route.id == 'equipment' ||
          route.id == 'skills' ||
          route.id == 'spells'
        ) {
          this.selectedRoute = route;
          this.showModal = true;
          this.filteredSpellsJson = await this.filterSpellsByClass(route.res);
        }
        break;
      case 5:
        this.selectedRoute = route;
        this.showModal = true;
        break;
      default:
        console.log('Error step');
        break;
    }
  }
  onModalClosed() {
    this.selectedRoute;
    this.showModal = false;
  }

  onCategoriesSelected(
    categories: Races | Classes | Equipment | Skills | Spells
  ) {
    const typeValue = this.selectedRoute.id;
    (categories as any).type = typeValue;
    this.selectedCategories = categories;
    this.selectedRoute.image = categories?.index;

    if (this.selectedRoute!.id === 'classes') {
      this.selectedClasse = categories as Classes;
    }
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

    this.routesApi[1].res = JSON.stringify({ results: this.wapons });
  }

  async filterSpellsByClass(rawJson: string): Promise<string> {
    const parsed = JSON.parse(rawJson) as {
      results: { index: string; name: string; url: string }[];
    };
    const summary = parsed.results;

    if (!this.selectedClasse) {
      return rawJson;
    }

    const detailPromises = summary.map((sp) =>
      fetch(baseUrl + sp.url)
        .then((res) => res.json())
        .catch(() => null)
    );

    const details = (await Promise.all(detailPromises)).filter(
      (d): d is Spells => !!d
    );

    const filtered = details.filter((spell) =>
      spell.classes.some((c) => c.index === this.selectedClasse!.index)
    );

    return JSON.stringify({ results: filtered });
  }

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
