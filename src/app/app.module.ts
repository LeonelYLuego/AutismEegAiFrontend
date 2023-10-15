import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './core/routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@core/application/app.component';
import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { NavBarComponent } from '@layout/nav-bar/nav-bar.component';
import { BaseComponent } from '@layout/base/base.component';
import { MaterialModule } from './material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AppComponent, NavBarComponent, BaseComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    // Core
    CoreModule,

    // Shared
    SharedModule,

    // Modules
    UsersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
