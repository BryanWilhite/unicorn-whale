import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';

import { AppComponent } from './components/app.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  imports: [BrowserModule, FormsModule, RoutingModule],
  declarations: [AppComponent, IndexComponent, SimpleInputComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
