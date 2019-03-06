import { Component, OnInit } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'nx-workspace-callbacks',
    templateUrl: './callbacks.component.html',
    styleUrls: ['./callbacks.component.scss'],
    animations: [
        trigger('photoState', [
            state(
                'move',
                style({
                    transform: 'translateX(-100%)'
                })
            ),
            state(
                'enlarge',
                style({
                    transform: 'scale(1.5)'
                })
            ),
            state(
                'spin',
                style({
                    transform: 'rotateY(180deg) rotateZ(90deg)'
                })
            ),
            transition('* => *', animate('500ms ease'))
        ])
    ]
})
export class CallbacksComponent implements OnInit {
    position: string | null;

    constructor() {}

    ngOnInit() {}

    changePosition(nextState: string | null): void {
        this.position = nextState;
    }

    logAnimation($event) {
        if (!this.position) {
            console.warn('position is not defined for event:', $event);
            return;
        }
        console.log(`${this.position} animation ${$event.phaseName}`);
    }
}
