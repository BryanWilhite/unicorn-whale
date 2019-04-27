import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'seo-splash';

  async ngAfterViewInit(): Promise<void> {
    const timeout = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    await timeout(2000);

    const main = Array.from(document.getElementsByTagName('main')).find(i => true) as HTMLMainElement;
    main.classList.add('hidden');

    await timeout(2000);

    main.classList.add('collapsed');
  }
}
