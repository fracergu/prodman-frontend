import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ServiceWorkerModule } from '@angular/service-worker'
import { IntegrationModule } from '@integration/integration.module'
import { AppLayoutModule } from '@layout/app.layout.module'
import { EffectsModule } from '@ngrx/effects'
import { Store, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppState } from '@redux/app.state'
import { AuthActions } from '@redux/auth/auth.actions'
import { AuthEffects } from '@redux/auth/auth.effects'
import { authReducer } from '@redux/auth/auth.reducer'
import { CategoriesEffects } from '@redux/categories/categories.effects'
import { categoriesReducer } from '@redux/categories/categories.reducer'
import { ConfigActions } from '@redux/config/config.actions'
import { ConfigEffects } from '@redux/config/config.effects'
import { configReducer } from '@redux/config/config.reducer'
import { ProductionEffects } from '@redux/production/production.effects'
import { productionReducer } from '@redux/production/production.reducer'
import { ProductsEffects } from '@redux/products/products.effects'
import { productsReducer } from '@redux/products/products.reducer'
import { TasksEffects } from '@redux/tasks/tasks.effects'
import { tasksReducer } from '@redux/tasks/tasks.reducer'
import { UserEffects } from '@redux/users/users.effects'
import { usersReducer } from '@redux/users/users.reducer'
import { WorkerEffects } from '@redux/worker/worker.effects'
import { workerReducer } from '@redux/worker/worker.reducer'
import { SharedModule } from '@shared/shared.module'
import { MessageService } from 'primeng/api'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthInterceptorService } from './interceptors/auth-interceptor.service'

const STORE_DEV_TOOLS_MAX_AGE = 25

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (provider: Store<AppState>) => () => {
        provider.dispatch(ConfigActions.loadConfig())
      },
      deps: [Store],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (provider: Store<AppState>) => () => {
        provider.dispatch(AuthActions.checkSession())
      },
      deps: [Store],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    MessageService,
  ],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    IntegrationModule,
    SharedModule,
    StoreModule.forRoot<AppState>({
      auth: authReducer,
      users: usersReducer,
      categories: categoriesReducer,
      products: productsReducer,
      tasks: tasksReducer,
      config: configReducer,
      worker: workerReducer,
      production: productionReducer,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects,
      CategoriesEffects,
      ProductsEffects,
      TasksEffects,
      ConfigEffects,
      WorkerEffects,
      ProductionEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: STORE_DEV_TOOLS_MAX_AGE,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
