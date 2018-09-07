import { animate, animation, style } from '@angular/animations';

export const slideBackAnimation = animation(
    [
        animate(
            '{{ time }} ease-out',
            style({ transform: 'translateX(-{{ x }}px)' })
        )
    ],
    { params: { time: '700ms', x: 100 } }
);

export const slideForwardAnimation = animation(
    [
        animate(
            '{{ time }} ease-out',
            style({ transform: 'translateX({{ x }}px)' })
        )
    ],
    { params: { time: '700ms', x: 100 } }
);
