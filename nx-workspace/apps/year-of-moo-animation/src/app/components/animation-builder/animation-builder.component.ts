import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild
} from '@angular/core';

import { AnimationBuilder, AnimationPlayer } from '@angular/animations';

import {
    slideAnimations,
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
    private players: Map<string, AnimationPlayer>;

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

        this.players = new Map();
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy() called');
        this.players.forEach(player => player.destroy());
    }

    slideBack(): void {
        this.photos.forEach((img, i) => {
            const player = this.getPlayer(slideBackAnimation.id, img, i);
            player.play();
        });
    }

    slideForward(): void {
        this.photos.forEach((img, i) => {
            const player = this.getPlayer(slideForwardAnimation.id, img, i);
            player.play();
        });
    }

    slideDivBack(): void {
        const div = AnimationBuilderComponent.getHtmlElement<HTMLDivElement>(
            this.simpleBlock
        );
        const player = this.getPlayer(slideBackAnimation.id, div);
        player.play();
    }

    slideDivForward(): void {
        const div = AnimationBuilderComponent.getHtmlElement<HTMLDivElement>(
            this.simpleBlock
        );
        const player = this.getPlayer(slideForwardAnimation.id, div);
        player.play();
    }

    private getPlayer(
        animationId: string,
        el: Element,
        elIndex: number = 0
    ): AnimationPlayer {
        const uniqueId = `${animationId}-${el.localName}${elIndex}`;
        if (this.players.has(uniqueId)) {
            this.players.get(uniqueId).destroy();
        }

        const animation = slideAnimations.get(animationId);
        const factory = this.animationBuilder.build(animation);
        const x = el.clientWidth / 2;

        const player = factory.create(el, { params: { x: x } });
        player.onDestroy(() => console.log(`player ${uniqueId} destroyed`));
        player.onDone(() => console.log(`player ${uniqueId} done`));
        this.players.set(uniqueId, player);

        return player;
    }
}
