import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild
} from '@angular/core';

import {
    AnimationBuilder,
    AnimationPlayer,
    AnimationReferenceMetadata
} from '@angular/animations';

import {
    slideBackAnimation,
    slideForwardAnimation
} from '../../animations/slide.animation';

@Component({
    selector: 'my-nx-workspace-animation-builder',
    templateUrl: './animation-builder.component.html',
    styleUrls: ['./animation-builder.component.scss']
})
export class AnimationBuilderComponent implements AfterViewInit, OnDestroy {
    @ViewChild('photos') photosContainer: ElementRef;

    private slideBackPlayers: AnimationPlayer[];
    private slideForwardPlayers: AnimationPlayer[];

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

        this.slideBackPlayers = [];
        this.slideForwardPlayers = [];

        children.forEach(el => {
            if (el.nodeName !== 'img'.toUpperCase()) {
                return;
            }

            const img = el as HTMLImageElement;

            const back = this.getPlayer(slideBackAnimation, img);
            back.onDone(() => {
                back.pause();
                back.reset();
                console.log({ 'back-on-done': back });
            });
            back.onDestroy(() => console.log({ 'back-on-destroy': back }));
            this.slideBackPlayers.push(back);

            const forward = this.getPlayer(slideForwardAnimation, img);
            forward.onDone(() => {
                forward.pause();
                forward.reset();
                console.log({ 'forward-on-destroy': forward });
            });
            forward.onDestroy(() =>
                console.log({ 'forward-on-destroy': forward })
            );
            this.slideForwardPlayers.push(forward);
        });
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy() called', {
            slideBackPlayers: this.slideBackPlayers,
            slideForwardPlayers: this.slideForwardPlayers
        });
        this.slideBackPlayers.forEach(p => p.destroy());
        this.slideForwardPlayers.forEach(p => p.destroy());
    }

    slideBack(): void {
        this.slideBackPlayers.forEach(p => p.play());
    }

    slideForward(): void {
        this.slideForwardPlayers.forEach(p => p.play());
    }

    private getPlayer(
        animationMetadata: AnimationReferenceMetadata,
        img: HTMLImageElement
    ): AnimationPlayer {
        const factory = this.animationBuilder.build(animationMetadata);
        const x = img.clientWidth / 2;
        const player = factory.create(img, { params: { x: x } });
        return player;
    }
}
