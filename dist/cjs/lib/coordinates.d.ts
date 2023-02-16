import type { LTWHP, Scaled, Viewport } from '../types';
interface PAGE_DIMENSIONS {
    width: number;
    height: number;
    scale: number;
}
export declare const viewportToScaled: (rect: LTWHP, { width, height, scale, }: PAGE_DIMENSIONS) => Scaled;
export declare const scaledToViewport: (scaled: Scaled, viewport: Viewport, usePdfCoordinates?: boolean) => LTWHP;
export {};
