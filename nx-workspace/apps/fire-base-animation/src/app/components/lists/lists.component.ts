import { Component, OnInit } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    stagger
} from '@angular/animations';

@Component({
    selector: 'nx-workspace-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss'],
    animations: [
        trigger('photosAnimation', [
            transition('* => *', [
                query('img', style({ transform: 'translateX(-100%)' })),
                query(
                    'img',
                    stagger('600ms', [
                        animate('900ms', style({ transform: 'translateX(0)' }))
                    ])
                )
            ])
        ])
    ]
})
export class ListsComponent implements OnInit {
    photos: string[];

    constructor() {
        this.photos = [
            'https://placekitten.com/121/121',
            'https://placekitten.com/121/121',
            'https://placekitten.com/121/121'
        ];
    }

    ngOnInit() {}
}
