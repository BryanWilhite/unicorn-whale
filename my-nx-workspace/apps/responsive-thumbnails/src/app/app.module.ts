import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NxModule } from '@nrwl/nx';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app.component';
import { ThumbsContainerComponent } from './components/thumbs-container/thumbs-container.component';

@NgModule({
    declarations: [AppComponent, ThumbsContainerComponent],
    imports: [BrowserModule, BrowserAnimationsModule, NxModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
