import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'my-nx-workspace-thumbs-container',
    templateUrl: './thumbs-container.component.html',
    styleUrls: ['./thumbs-container.component.scss']
})
export class ThumbsContainerComponent implements AfterViewInit {
    @ViewChild('thumbsContainer') thumbsContainer: ElementRef;

    private thumbsContainerDiv: HTMLDivElement;

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

    constructor() {}

    ngAfterViewInit(): void {
        this.thumbsContainerDiv = ThumbsContainerComponent.getHtmlElement<
            HTMLDivElement
        >(this.thumbsContainer);
    }

    slideBlocks(direction: string): void {
        console.log({ direction: direction });
        const wrapperContainerWidth = this.thumbsContainerDiv.clientWidth;
        const blockWrapper = this.thumbsContainerDiv.firstElementChild;
        const duration = 500;
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
        const getSlideRightLength = function() {
            const l = Math.abs(wrapperLeft);
            return l > wrapperContainerWidth ? wrapperContainerWidth : l;
        };

        // console.log(
        //     "blockWrapper:", blockWrapper,
        //     "wrapperContainer:", wrapperContainer,
        //     "wrapperContainerWidth:", wrapperContainerWidth,
        //     "wrapperLeft", wrapperLeft
        // );

        switch (direction) {
            case "left":
                if (cannotSlideLeft()) {
                    return;
                }
                // blockWrapper.animate({
                //     left: "-=" + wrapperContainer.width()
                // }, duration);
                break;
    
            case "right":
                // if (blockWrapper.position().left >= 0) {
                //     return;
                // }
                // blockWrapper.animate({
                //     left: "+=" + getSlideRightLength()
                // }, duration);
                break;
        }
    }
}
