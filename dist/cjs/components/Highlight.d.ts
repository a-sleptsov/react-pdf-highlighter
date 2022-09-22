import { FC } from 'react';
import '../style/Highlight.css';
import type { LTWHP } from '../types.js';
interface Props {
    position: {
        boundingRect: LTWHP;
        rects: Array<LTWHP>;
    };
    onClick?: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    comment: {
        emoji: string;
        text: string;
    };
    isScrolledTo: boolean;
}
export declare const Highlight: FC<Props>;
export default Highlight;
