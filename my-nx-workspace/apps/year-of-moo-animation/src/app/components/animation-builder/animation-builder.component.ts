import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { AnimationBuilder } from '@angular/animations';

import { slideAnimation } from '../../animations/slide.animation';

@Component({
    selector: 'my-nx-workspace-animation-builder',
    templateUrl: './animation-builder.component.html',
    styleUrls: ['./animation-builder.component.scss']
})
export class AnimationBuilderComponent implements AfterViewInit {
    @ViewChild('photos') photosContainer: ElementRef;
    photos: HTMLImageElement[];

    constructor(private animationBuilder: AnimationBuilder) {}

    ngAfterViewInit(): void {
        const div = this.photosContainer.nativeElement as HTMLDivElement;
        if (!div) {
            console.warn('the expected div element is not here');
            return;
        }
        const children = Array.from(div.children);
        if (!children) {
            console.warn('the expected div element children are not here');
            return;
        }
        if (!children.length) {
            console.warn(
                'the expected number of div element children is not here'
            );
            return;
        }

        this.photos = [];

        children.forEach(el => {
            if (el.nodeName !== 'img'.toUpperCase()) {
                return;
            }
            this.photos.push(el as HTMLImageElement);
        });
    }

    animate(): void {
        const factory = this.animationBuilder.build(slideAnimation);
        this.photos.forEach(img => {
            const x = img.clientWidth / 2;
            const player = factory.create(img, { params: { x: x } });
            player.play();
        });
    }
}
