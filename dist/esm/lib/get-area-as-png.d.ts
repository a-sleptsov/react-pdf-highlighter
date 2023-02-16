import { PDFDocumentProxy } from 'pdfjs-dist';
import type { LTWHP } from '../types.js';
interface AreaAsPng {
    pdfDocument: PDFDocumentProxy;
    position: LTWHP;
    scale: number;
}
declare const getAreaAsPNG: ({ pdfDocument, position, scale, }: AreaAsPng) => Promise<Blob | null>;
export default getAreaAsPNG;
