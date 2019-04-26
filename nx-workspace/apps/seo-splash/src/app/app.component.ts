import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'seo-splash';

  ngAfterViewInit(): void {
    const main = Array.from(document.getElementsByTagName('main')).find(i => true) as HTMLMainElement;
    main.classList.add('hidden');
    setTimeout(() => { main.classList.add('collapsed'); }, 2000);
  }
}
