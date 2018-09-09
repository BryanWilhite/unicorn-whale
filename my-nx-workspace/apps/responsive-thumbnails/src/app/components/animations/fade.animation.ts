import { animate, animation, style } from '@angular/animations';

export const fadeInAnimation = animation(
    [
        style({ opacity: '{{ from }}' }),
        animate('{{ time }} ease-in', style({ opacity: '{{ to }}' }))
    ],
    { params: { time: '1s' } }
);

export const fadeOutAnimation = animation(
    [
        style({ opacity: '{{ from }}' }),
        animate('{{ time }} ease-out', style({ opacity: '{{ to }}' }))
    ],
    { params: { time: '600ms' } }
);
