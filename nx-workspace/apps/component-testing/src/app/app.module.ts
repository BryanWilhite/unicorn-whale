import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';

import { AppComponent } from './components/app.component';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';

import { DetectChangesComponent } from './components/detect-changes/detect-changes.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';

@NgModule({
  imports: [BrowserModule, FormsModule, RoutingModule],
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    SimpleInputComponent,
    DetectChangesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
