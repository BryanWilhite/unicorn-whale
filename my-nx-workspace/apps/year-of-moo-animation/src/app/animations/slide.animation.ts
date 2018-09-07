import { animate, animation, style } from '@angular/animations';

export const slideAnimation = animation(
    [
        style({ transform: 'translateX(0px)' }),
        animate(
            '{{ time }} ease-out',
            style({ transform: 'translateX({{ x }}px)' })
        )
    ],
    { params: { time: '700ms', x: 100 } }
);
