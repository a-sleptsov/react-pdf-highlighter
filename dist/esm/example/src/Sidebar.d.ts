/// <reference types="react" />
import type { IHighlight } from "./react-pdf-highlighter";
interface Props {
    highlights: Array<IHighlight>;
    resetHighlights: () => void;
    toggleDocument: () => void;
}
export declare function Sidebar({ highlights, toggleDocument, resetHighlights, }: Props): JSX.Element;
export {};
