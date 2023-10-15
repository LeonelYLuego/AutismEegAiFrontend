import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpPetitions } from './services/http-petitions.service';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [HttpClientModule, MaterialModule],
  providers: [HttpPetitions],
})
export class CoreModule {}
