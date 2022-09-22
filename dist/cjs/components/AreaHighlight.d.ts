import { FC } from 'react';
import '../style/AreaHighlight.css';
import type { LTWHP, ViewportHighlight } from '../types';
interface Props {
    highlight: ViewportHighlight;
    onChange: (rect: LTWHP) => void;
    isScrolledTo: boolean;
}
export declare const AreaHighlight: FC<Props>;
export default AreaHighlight;
