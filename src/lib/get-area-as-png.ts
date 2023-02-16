import { PDFDocumentProxy } from 'pdfjs-dist';

import { isHTMLCanvasElement } from './pdfjs-dom';
import type { LTWHP } from '../types.js';

interface AreaAsPng {
  pdfDocument: PDFDocumentProxy,
  position: LTWHP,
  scale: number,
}

const DEFAULT_SCALE = 2;
const PAGE_NUMBER_KEY = 'pageNumber';

const convertBase64ToBlob = (dataURI: string) => {
  const splitDataURI = dataURI.split(',');
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? window.atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

  const uint8 = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    uint8[i] = byteString.charCodeAt(i);
  }

  return new Blob([uint8], { type: mimeString });
};

const getCanvasWithContext = (canvasWidth: number, canvasHeight: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const canvasContext = canvas.getContext('2d');

  return { canvas, canvasContext };
};

const getAreaAsPNG = async ({
  pdfDocument,
  position,
  scale,
}: AreaAsPng): Promise<Blob | null> => {
  const scaledPosition = { ...position };
  const scaleRatio = DEFAULT_SCALE / scale;

  Object.entries(scaledPosition).forEach(([key, value]) => {
    if (key !== PAGE_NUMBER_KEY) {
      scaledPosition[key as keyof LTWHP] = value * scaleRatio;
    }
  });

  const {
    width,
    height,
    top,
    left,
    pageNumber,
  } = scaledPosition;

  if (!pageNumber) {
    return null;
  }

  const pdfPage = await pdfDocument.getPage(pageNumber);
  const pdfPageViewport = pdfPage.getViewport({ scale: DEFAULT_SCALE });

  const {
    canvas: pdfPageCanvas,
    canvasContext: pageCanvasContext,
  } = getCanvasWithContext(pdfPageViewport.width, pdfPageViewport.height);

  if (!pageCanvasContext || !isHTMLCanvasElement(pdfPageCanvas)) {
    return null;
  }

  const renderTask = pdfPage.render({
    canvasContext: pageCanvasContext,
    viewport: pdfPageViewport,
  });

  await renderTask.promise;
  const {
    canvas: highlightCanvas,
    canvasContext: highlightCanvasContext,
  } = getCanvasWithContext(width, height);

  if (!highlightCanvasContext || !highlightCanvas) {
    return null;
  }

  highlightCanvasContext.drawImage(
    pdfPageCanvas,
    left,
    top,
    width,
    height,
    0,
    0,
    width,
    height,
  );

  const base64Image = highlightCanvas.toDataURL('image/png');

  return convertBase64ToBlob(base64Image);
};

export default getAreaAsPNG;
