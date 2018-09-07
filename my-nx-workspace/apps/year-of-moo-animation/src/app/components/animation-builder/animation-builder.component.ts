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
        const div = AnimationBuilderComponent.getHtmlElement<HTMLDivElement>(this.photosContainer);
        const children = AnimationBuilderComponent.getHtmlElements(div.children);

        this.photos = children
            .filter(el => el.nodeName === 'img'.toUpperCase())
            .map(el => el as HTMLImageElement);
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy() called');
    }

    slideBack(): void {
        this.photos.forEach(img => {
            const player = this.getImgPlayer(slideBackAnimation, img);
            player.play();
        });
    }

    slideForward(): void {
        this.photos.forEach(img => {
            const player = this.getImgPlayer(slideForwardAnimation, img);
            player.play();
        });
    }

    slideDivBack(): void {
        const div = AnimationBuilderComponent.getHtmlElement<HTMLDivElement>(this.simpleBlock);
        const player = this.getDivPlayer(slideBackAnimation, div);
        player.play();
    }

    slideDivForward(): void {
        const div = AnimationBuilderComponent.getHtmlElement<HTMLDivElement>(this.simpleBlock);
        const player = this.getDivPlayer(slideForwardAnimation, div);
        player.play();
    }

    private getDivPlayer(
        animationMetadata: AnimationReferenceMetadata,
        div: HTMLDivElement
    ): AnimationPlayer {
        const factory = this.animationBuilder.build(animationMetadata);
        const x = div.clientWidth / 2;
        const player = factory.create(div, { params: { x: x } });
        return player;
    }

    private getImgPlayer(
        animationMetadata: AnimationReferenceMetadata,
        img: HTMLImageElement
    ): AnimationPlayer {
        const factory = this.animationBuilder.build(animationMetadata);
        const x = img.clientWidth / 2;
        const player = factory.create(img, { params: { x: x } });
        return player;
    }
}
