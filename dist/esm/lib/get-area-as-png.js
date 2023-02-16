var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isHTMLCanvasElement } from './pdfjs-dom';
const DEFAULT_SCALE = 2;
const PAGE_NUMBER_KEY = 'pageNumber';
const convertBase64ToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? window.atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    const uint8 = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
        uint8[i] = byteString.charCodeAt(i);
    }
    return new Blob([uint8], { type: mimeString });
};
const getCanvasWithContext = (canvasWidth, canvasHeight) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const canvasContext = canvas.getContext('2d');
    return { canvas, canvasContext };
};
const getAreaAsPNG = ({ pdfDocument, position, scale, }) => __awaiter(void 0, void 0, void 0, function* () {
    const scaledPosition = Object.assign({}, position);
    const scaleRatio = DEFAULT_SCALE / scale;
    Object.entries(scaledPosition).forEach(([key, value]) => {
        if (key !== PAGE_NUMBER_KEY) {
            scaledPosition[key] = value * scaleRatio;
        }
    });
    const { width, height, top, left, pageNumber, } = scaledPosition;
    if (!pageNumber) {
        return null;
    }
    const pdfPage = yield pdfDocument.getPage(pageNumber);
    const pdfPageViewport = pdfPage.getViewport({ scale: DEFAULT_SCALE });
    const { canvas: pdfPageCanvas, canvasContext: pageCanvasContext, } = getCanvasWithContext(pdfPageViewport.width, pdfPageViewport.height);
    if (!pageCanvasContext || !isHTMLCanvasElement(pdfPageCanvas)) {
        return null;
    }
    const renderTask = pdfPage.render({
        canvasContext: pageCanvasContext,
        viewport: pdfPageViewport,
    });
    yield renderTask.promise;
    const { canvas: highlightCanvas, canvasContext: highlightCanvasContext, } = getCanvasWithContext(width, height);
    if (!highlightCanvasContext || !highlightCanvas) {
        return null;
    }
    highlightCanvasContext.drawImage(pdfPageCanvas, left, top, width, height, 0, 0, width, height);
    const base64Image = highlightCanvas.toDataURL('image/png');
    return convertBase64ToBlob(base64Image);
});
export default getAreaAsPNG;
//# sourceMappingURL=get-area-as-png.js.map