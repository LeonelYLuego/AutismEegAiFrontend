import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [DeleteDialogComponent],
  exports: [DeleteDialogComponent],
})
export class SharedModule {}
