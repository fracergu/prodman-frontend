import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppLayoutComponent } from '@layout/app.layout.component'

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/overview/overview.module').then(
            m => m.OverviewModule,
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.module').then(
            m => m.ProductsModule,
          ),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./pages/tasks/tasks.module').then(m => m.TasksModule),
      },
      {
        path: 'production',
        loadChildren: () =>
          import('./pages/production/production.module').then(
            m => m.ProductionModule,
          ),
      },
    ],
  },
  {
    path: 'admin-login',
    loadChildren: () =>
      import('./pages/admin-login/admin-login.module').then(
        m => m.AdminLoginModule,
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'worker',
    loadChildren: () =>
      import('./pages/worker/worker.module').then(m => m.WorkerModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
