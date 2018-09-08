import {
    AnimationReferenceMetadata,
    animate,
    animation,
    style
} from '@angular/animations';

export const slideBackAnimation = {
    id: 'slide-back',
    animation: animation(
        [
            animate(
                '{{ time }} ease-out',
                style({ transform: 'translateX(-{{ x }}px)' })
            )
        ],
        { params: { time: '700ms', x: 100 } }
    )
};

export const slideForwardAnimation = {
    id: 'slide-forward',
    animation: animation(
        [
            animate(
                '{{ time }} ease-out',
                style({ transform: 'translateX({{ x }}px)' })
            )
        ],
        { params: { time: '700ms', x: 100 } }
    )
};

export const slideAnimations = new Map<string, AnimationReferenceMetadata>([
    [slideForwardAnimation.id, slideForwardAnimation.animation],
    [slideBackAnimation.id, slideBackAnimation.animation]
]);
