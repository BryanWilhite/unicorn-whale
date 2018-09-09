import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { AnimationBuilder, AnimationPlayer } from '@angular/animations';

import {
    slideAnimations,
    slideBackAnimation,
    slideForwardAnimation
} from '../../animations/slide.animation';

@Component({
    selector: 'my-nx-workspace-thumbs-container',
    templateUrl: './thumbs-container.component.html',
    styleUrls: ['./thumbs-container.component.scss']
})
export class ThumbsContainerComponent implements AfterViewInit {
    @ViewChild('thumbsContainer') thumbsContainer: ElementRef;

    private thumbsContainerDiv: HTMLDivElement;
    private players: Map<string, AnimationPlayer>;

    private static getHtmlElement<TElement extends HTMLElement>(
        elementRef: ElementRef
    ): TElement {
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
        this.thumbsContainerDiv = ThumbsContainerComponent.getHtmlElement<
            HTMLDivElement
        >(this.thumbsContainer);

        this.players = new Map();
    }

    private getPlayer(
        animationId: string,
        params: {},
        el: Element,
        elIndex: number = 0
    ): AnimationPlayer {
        const uniqueId = `${animationId}-${el.localName}${elIndex}`;
        if (this.players.has(uniqueId)) {
            this.players.get(uniqueId).destroy();
        }

        const animation = slideAnimations.get(animationId);
        const factory = this.animationBuilder.build(animation);

        const player = factory.create(el, { params: params });
        player.onDestroy(() => console.log(`player ${uniqueId} destroyed`));
        player.onDone(() => console.log(`player ${uniqueId} done`));
        this.players.set(uniqueId, player);

        return player;
    }

    slideBlocks(direction: string): void {
        console.log({ direction: direction });
        const wrapperContainerWidth = this.thumbsContainerDiv.clientWidth;
        const blockWrapper = this.thumbsContainerDiv.firstElementChild;
        const wrapperLeft = blockWrapper.clientLeft;
        const cannotSlideLeft = () => {
            const fixedBlockWidth = 124;
            const blocks = ThumbsContainerComponent.getHtmlElements(
                blockWrapper.children
            )
                .filter(el => el.localName === 'span')
                .map(el => el as HTMLSpanElement);
            const totalWidth = fixedBlockWidth * blocks.length;
            const slideLeftLength =
                Math.abs(wrapperLeft) + wrapperContainerWidth;
            return slideLeftLength >= totalWidth;
        };
        const cannotSlideRight = () => blockWrapper.clientLeft >= 0;
        const getSlideRightLength = function() {
            const l = Math.abs(wrapperLeft);
            return l > wrapperContainerWidth ? wrapperContainerWidth : l;
        };

        console.log({
            blockWrapper,
            thumbsContainerDiv: this.thumbsContainerDiv,
            wrapperContainerWidth,
            wrapperLeft
        });

        switch (direction) {
            case 'left':
                if (cannotSlideLeft()) {
                    return;
                }
                const leftPlayer = this.getPlayer(
                    slideBackAnimation.id,
                    { x: wrapperContainerWidth },
                    blockWrapper
                );
                leftPlayer.play();
                break;

            case 'right':
                if (cannotSlideRight()) {
                    return;
                }
                const rightPlayer = this.getPlayer(
                    slideBackAnimation.id,
                    { x: getSlideRightLength() },
                    blockWrapper
                );
                rightPlayer.play();
                break;
        }
    }
}
