import { Component, Input } from '@angular/core';

@Component({
  selector: 'nx-workspace-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss']
})
export class SimpleInputComponent {
  @Input() value = true;
  constructor() {}
}
