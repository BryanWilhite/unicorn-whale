import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { DetectChangesComponent } from './components/detect-changes/detect-changes.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'detect-changes', component: DetectChangesComponent },
    { path: 'reactive-forms', component: ReactiveFormsComponent },
    { path: 'simple-input', component: SimpleInputComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}
