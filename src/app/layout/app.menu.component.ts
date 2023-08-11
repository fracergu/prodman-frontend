import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Inicio',
        items: [
          {
            label: 'Panel de control',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: 'Mantenimientos',
        items: [
          {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/users'],
          },
          {
            label: 'Productos',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/products'],
          },
          {
            label: 'Tareas',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/tasks'],
          },
        ],
      },
      {
        label: 'Informes',
        items: [
          {
            label: 'Producción',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: ['/production'],
          },
          {
            label: 'Stock',
            icon: 'pi pi-fw pi-shopping-bag',
            routerLink: ['/stocks'],
          },
        ],
      },
    ];
  }
}
