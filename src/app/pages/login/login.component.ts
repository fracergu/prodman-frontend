import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }

      .pin-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 10px;
      }

      .pin-button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .pin-button button {
        display: flex;
        width: 65px;
        height: 65px;
        font-size: 36px;
        vertical-align: middle;
        justify-content: center;
      }
    `,
  ],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  password: string = '';

  selectedUser: any;

  onPinClick(value?: any) {
    this.password += value;
  }

  onDeleteClick() {
    this.password = this.password.slice(0, -1);
  }

  onLoginClick() {
    console.log('login');
  }

  usersMock: any[] = [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
    {
      id: 3,
      name: 'John Smith',
    },
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
    {
      id: 3,
      name: 'John Smith',
    },
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
    {
      id: 3,
      name: 'John Smith',
    },
  ];

  constructor(public layoutService: LayoutService) {}
}
