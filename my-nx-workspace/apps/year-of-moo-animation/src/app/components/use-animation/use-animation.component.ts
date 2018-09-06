import { Component, OnInit } from '@angular/core';

import {
    state,
    style,
    transition,
    trigger,
    useAnimation
} from '@angular/animations';

import {
    fadeInAnimation,
    fadeOutAnimation
} from '../../animations/fade.animation';

@Component({
    selector: 'my-nx-workspace-use-animation',
    templateUrl: './use-animation.component.html',
    styleUrls: ['./use-animation.component.scss'],
    animations: [
        trigger('popOverState', [
            state(
                'show',
                style({
                    opacity: 1
                })
            ),
            state(
                'hide',
                style({
                    opacity: 0
                })
            ),
            transition('hide => show', [
                useAnimation(fadeInAnimation, {
                    params: {
                        from: 0,
                        to: 1
                    }
                })
            ]),
            transition('show => hide', [
                useAnimation(fadeOutAnimation, {
                    params: {
                        from: 1,
                        to: 0
                    }
                })
            ])
        ])
    ]
})
export class UseAnimationComponent implements OnInit {
    show: boolean;

    constructor() {}

    ngOnInit(): void {
        this.show = false;
    }

    get stateName() {
        return this.show ? 'show' : 'hide';
    }

    toggle() {
        this.show = !this.show;
    }
}
