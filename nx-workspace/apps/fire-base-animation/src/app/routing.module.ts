import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { CallbacksComponent } from './components/callbacks/callbacks.component';
import { KeyframesComponent } from './components/keyframes/keyframes.component';
import { ListsComponent } from './components/lists/lists.component';
import { MultiStateComponent } from './components/multi-state/multi-state.component';
import { PopOverComponent } from './components/pop-over/pop-over.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'callbacks', component: CallbacksComponent },
    { path: 'keyframes', component: KeyframesComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'multi-state', component: MultiStateComponent },
    { path: 'pop-over', component: PopOverComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}