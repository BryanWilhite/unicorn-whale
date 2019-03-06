import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { AnimationBuilder, AnimationPlayer } from '@angular/animations';

import { slideAnimations, slideAnimation } from '../../animations/slide.animation';

@Component({
    selector: 'nx-workspace-thumbs-container',
    templateUrl: './thumbs-container.component.html',
    styleUrls: ['./thumbs-container.component.scss']
})
export class ThumbsContainerComponent implements AfterViewInit {
    @ViewChild('thumbsContainer') thumbsContainer: ElementRef;

    private thumbsContainerDiv: HTMLDivElement;
    private thumbsContainerDivWrapper: HTMLDivElement;
    private thumbsContainerDivWrapperStyleDeclaration: CSSStyleDeclaration;
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

    private static getStyleDeclaration(element: Element): CSSStyleDeclaration {
        const style = element['style'] as CSSStyleDeclaration;
        if (!style) {
            console.warn('the expected CSS style declaration is not here');
        }
        return style;
    }

    constructor(private animationBuilder: AnimationBuilder) {}

    ngAfterViewInit(): void {
        this.thumbsContainerDiv = ThumbsContainerComponent.getHtmlElement<
            HTMLDivElement
        >(this.thumbsContainer);

        this.thumbsContainerDivWrapper = this.thumbsContainerDiv
            .firstElementChild as HTMLDivElement;

        this.thumbsContainerDivWrapperStyleDeclaration = ThumbsContainerComponent.getStyleDeclaration(
            this.thumbsContainerDivWrapper
        );
        this.thumbsContainerDivWrapperStyleDeclaration.left = `${0}px`;

        this.players = new Map();
    }

    private getPlayer(
        animationId: string,
        params: { time: string; x1: number; x2: number },
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
        player.onDone(() => {
            console.log(`player ${uniqueId} done`);
            this.thumbsContainerDivWrapperStyleDeclaration.left = `${
                params.x2
            }px`;
        });
        this.players.set(uniqueId, player);

        return player;
    }

    slideBlocks(direction: string): void {
        console.log({ direction: direction });

        const wrapperContainerWidth = this.thumbsContainerDiv.clientWidth;
        const style = this.thumbsContainerDivWrapperStyleDeclaration;
        const wrapperLeft = style.left ? parseInt(style.left, 10) : 0;

        const blocks = ThumbsContainerComponent.getHtmlElements(
            this.thumbsContainerDivWrapper.children
        )
            .filter(el => el.localName === 'span')
            .map(el => el as HTMLSpanElement);

        const fixedBlockWidth = 124;
        const totalWidth = fixedBlockWidth * blocks.length;

        const cannotSlideBack = () => {
            const slideLeftLength =
                Math.abs(wrapperLeft) + wrapperContainerWidth;
            return slideLeftLength >= totalWidth;
        };
        const cannotSlideForward = () => wrapperLeft >= 0;

        const getSlideForwardLength = function(): number {
            const l = Math.abs(wrapperLeft);
            return l > wrapperContainerWidth ? wrapperContainerWidth : l;
        };

        console.log({
            getSlideRightLength: getSlideForwardLength(),
            wrapperContainerWidth,
            wrapperLeft
        });

        switch (direction) {
            case 'forward':
                if (cannotSlideForward()) {
                    console.warn('cannot slide forward');
                    return;
                }
                const lPlayer = this.getPlayer(
                    slideAnimation.id,
                    {
                        time: '700ms',
                        x1: wrapperLeft,
                        x2: wrapperLeft + getSlideForwardLength()
                    },
                    this.thumbsContainerDivWrapper
                );
                lPlayer.play();
                break;

            case 'back':
                if (cannotSlideBack()) {
                    console.warn('cannot slide back');
                    return;
                }
                const rPlayer = this.getPlayer(
                    slideAnimation.id,
                    {
                        time: '700ms',
                        x1: wrapperLeft,
                        x2: wrapperLeft - wrapperContainerWidth
                    },
                    this.thumbsContainerDivWrapper
                );
                rPlayer.play();
                break;
        }
    }
}
