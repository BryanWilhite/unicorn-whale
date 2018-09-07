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
    @ViewChild('simpleBlock') simpleBlock: ElementRef;

    private photos: HTMLImageElement[];

    private static getHtmlElement<TElement>(elementRef: ElementRef): TElement {
        const el = elementRef.nativeElement as TElement;
        if (!el) {
            console.warn('the expected element is not here');
            return;
        }
        return el;
    }

    private static getHtmlElements(collection: HTMLCollection): Element[] {
        const children = Array.from(collection);
        if (!children) {
            console.warn('the expected element children are not here');
            return;
        }
        if (!children.length) {
            console.warn('the expected number of element children is not here');
            return;
        }
        return children;
    }

    constructor(private animationBuilder: AnimationBuilder) {}

    ngAfterViewInit(): void {
        const div = AnimationBuilderComponent.getHtmlElement<HTMLDivElement>(
            this.photosContainer
        );
        const children = AnimationBuilderComponent.getHtmlElements(
            div.children
        );

        this.photos = children
            .filter(el => el.localName === 'img')
            .map(el => el as HTMLImageElement);
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy() called');
    }

    slideBack(): void {
        this.photos.forEach(img => {
            const player = this.getPlayer(slideBackAnimation, img);
            player.play();
        });
    }

    slideForward(): void {
        this.photos.forEach(img => {
            const player = this.getPlayer(slideForwardAnimation, img);
            player.play();
        });
    }

    slideDivBack(): void {
        const div = AnimationBuilderComponent.getHtmlElement<HTMLDivElement>(
            this.simpleBlock
        );
        const player = this.getPlayer(slideBackAnimation, div);
        player.play();
    }

    slideDivForward(): void {
        const div = AnimationBuilderComponent.getHtmlElement<HTMLDivElement>(
            this.simpleBlock
        );
        const player = this.getPlayer(slideForwardAnimation, div);
        player.play();
    }

    private getPlayer(
        animationMetadata: AnimationReferenceMetadata,
        el: Element
    ): AnimationPlayer {
        const factory = this.animationBuilder.build(animationMetadata);
        const x = el.clientWidth / 2;
        const player = factory.create(el, { params: { x: x } });
        player.onDestroy(() => console.log(`player ${player['id']} destroyed`));
        player.onDone(() => {
            console.log(`player ${player['id']} done`, player);
            setTimeout(() => player.destroy(), 500);
        });
        return player;
    }
}
