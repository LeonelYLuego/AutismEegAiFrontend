import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, notAuthGuard } from '@core/guards/auth.guard';
import { BaseComponent } from '@layout/base/base.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.module').then((m) => m.AuthModule),
    canActivate: [notAuthGuard],
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'patients',
        loadChildren: () =>
          import('@patients/patients.module').then((m) => m.PatientsModule),
      },
      {
        path: 'studies',
        loadChildren: () =>
          import('@studies/studies.module').then((m) => m.StudiesModule),
      },
      {
        path: '',
        redirectTo: 'patients',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'patients',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
