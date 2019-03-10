import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';

import { AppComponent } from './components/app.component';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';

import { DetectChangesComponent } from './components/detect-changes/detect-changes.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { TemplateFormsComponent } from './components/template-forms/template-forms.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RoutingModule],
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    SimpleInputComponent,
    DetectChangesComponent,
    ReactiveFormsComponent,
    TemplateFormsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
