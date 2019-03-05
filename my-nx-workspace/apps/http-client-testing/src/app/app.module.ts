import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';

import { GitHubApiService } from './services/git-hub-api/git-hub-api.service';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NxModule.forRoot()],
    providers: [GitHubApiService],
    bootstrap: [AppComponent]
})
export class AppModule {}
