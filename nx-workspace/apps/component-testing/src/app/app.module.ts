import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing.module';

import { AppComponent } from './components/app.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [AppComponent, SimpleInputComponent, IndexComponent],
  imports: [BrowserModule, RoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
