import { Component, OnInit } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'nx-workspace-multi-state',
    templateUrl: './multi-state.component.html',
    styleUrls: ['./multi-state.component.scss'],
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
export class MultiStateComponent implements OnInit {
    position: string | null;

    constructor() {}

    ngOnInit() {}

    changePosition(nextState: string | null): void {
        this.position = nextState;
    }
}
