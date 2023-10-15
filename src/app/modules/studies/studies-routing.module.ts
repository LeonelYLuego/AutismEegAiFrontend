import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudiesComponent } from './studies/studies.component';
import { StudyComponent } from './study/study.component';

const routes: Routes = [
  {
    path: ':patientId',
    component: StudiesComponent,
  },
  {
    path: ':patientId/:id',
    component: StudyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudiesRoutingModule {}
