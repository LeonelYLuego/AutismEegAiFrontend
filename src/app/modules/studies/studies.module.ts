import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudiesComponent } from './studies/studies.component';
import { StudiesRoutingModule } from './studies-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { AddStudyComponent } from './add-study/add-study.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudyComponent } from './study/study.component';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import {
  BarController,
  BarElement,
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

@NgModule({
  declarations: [StudiesComponent, AddStudyComponent, StudyComponent],
  imports: [
    StudiesRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartjsModule,
  ],
})
export class StudiesModule {}
