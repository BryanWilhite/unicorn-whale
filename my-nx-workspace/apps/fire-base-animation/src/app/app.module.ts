import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';

import { AppComponent } from './components/app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NxModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
