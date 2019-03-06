import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { UseAnimationComponent } from './components/use-animation/use-animation.component';
import { AnimationBuilderComponent } from './components/animation-builder/animation-builder.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'use-animation', component: UseAnimationComponent },
    { path: 'animation-builder', component: AnimationBuilderComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}
