import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing.module';

import { AppComponent } from './components/app.component';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';
import { CallbacksComponent } from './components/callbacks/callbacks.component';
import { KeyframesComponent } from './components/keyframes/keyframes.component';
import { ListsComponent } from './components/lists/lists.component';
import { MultiStateComponent } from './components/multi-state/multi-state.component';
import { PopOverComponent } from './components/pop-over/pop-over.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        MenuComponent,
        CallbacksComponent,
        KeyframesComponent,
        ListsComponent,
        MultiStateComponent,
        PopOverComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RoutingModule,
        NxModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
