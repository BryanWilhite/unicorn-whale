import { Component, OnInit } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    keyframes,
    transition
} from '@angular/animations';

@Component({
    selector: 'my-nx-workspace-keyframes',
    templateUrl: './keyframes.component.html',
    styleUrls: ['./keyframes.component.scss'],
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
            transition(
                '* => move',
                animate(
                    '2000ms',
                    keyframes([
                        style({
                            transform: 'translateX(0)    rotateY(0)',
                            offset: 0
                        }),
                        style({
                            transform: 'translateX(50%)  rotateY(90deg)',
                            offset: 0.33
                        }),
                        style({
                            transform: 'translateY(-75%) rotateY(180deg)',
                            offset: 0.66
                        }),
                        style({ transform: 'translateX(-100%)', offset: 1.0 })
                    ])
                )
            ),
            transition('* => *', animate('500ms ease'))
        ])
    ]
})
export class KeyframesComponent implements OnInit {
    position: string | null;

    constructor() {}

    ngOnInit() {}

    changePosition(nextState: string | null): void {
        this.position = nextState;
    }
}
