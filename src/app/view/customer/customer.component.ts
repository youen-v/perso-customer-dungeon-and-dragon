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
  selectedRoute: { id: string; url: string; res: string } | null = null;

  openModal(route: { id: string; url: string; res: string }) {
    this.selectedRoute = route;
    this.showModal = true;
  }
  onModalClosed() {
    this.selectedRoute = null;
    this.showModal = false;
  }

  routesApi = [
    { id: 'classes', url: '/api/2014/classes', res: '' },
    { id: 'equipment', url: '/api/2014/equipment', res: '' },
    { id: 'races', url: '/api/2014/races', res: '' },
    { id: 'skills', url: '/api/2014/skills', res: '' },
    { id: 'spells', url: '/api/2014/spells', res: '' },
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
