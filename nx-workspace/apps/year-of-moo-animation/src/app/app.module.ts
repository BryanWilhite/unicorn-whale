import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';

import { RoutingModule } from './routing.module';

import { AppComponent } from './components/app.component';
import { MenuComponent } from './components/menu/menu.component';
import { IndexComponent } from './components/index/index.component';
import { UseAnimationComponent } from './components/use-animation/use-animation.component';
import { AnimationBuilderComponent } from './components/animation-builder/animation-builder.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        IndexComponent,
        UseAnimationComponent,
        AnimationBuilderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NxModule.forRoot(),
        RoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
