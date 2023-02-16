// "viewport" rectangle is { top, left, width, height }

// "scaled" means that data structure stores (0, 1) coordinates.
// for clarity reasons I decided not to store actual (0, 1) coordinates, but
// provide width and height, so user can compute ratio himself if needed

import type { LTWHP, Scaled, Viewport } from '../types';

interface PAGE_DIMENSIONS {
  width: number;
  height: number;
  scale: number;
}

const PAGE_NUMBER_KEY = 'pageNumber';

const getScaledRect = (rect: LTWHP, scale: number) => {
  const newRect = { ...rect };
  const rectEntries = Object.entries(newRect);

  rectEntries.forEach(([key, value]) => {
    if (key !== PAGE_NUMBER_KEY) {
      newRect[key as keyof LTWHP] = value / scale;
    }
  });

  return newRect;
};

export const viewportToScaled = (
  rect: LTWHP,
  {
    width,
    height,
    scale,
  }: PAGE_DIMENSIONS,
): Scaled => {
  const scaledRect = getScaledRect(rect, scale);
  const scaledWidth = width / scale;
  const scaledHeight = height / scale;

  return {
    x1: scaledRect.left,
    y1: scaledRect.top,

    x2: scaledRect.left + scaledRect.width,
    y2: scaledRect.top + scaledRect.height,

    width: scaledWidth,
    height: scaledHeight,

    pageNumber: scaledRect.pageNumber,
  };
};

const pdfToViewport = (pdf: Scaled, viewport: Viewport): LTWHP => {
  const [x1, y1, x2, y2] = viewport.convertToViewportRectangle([
    pdf.x1,
    pdf.y1,
    pdf.x2,
    pdf.y2,
  ]);

  return {
    left: x1,
    top: y1,

    width: x2 - x1,
    height: y1 - y2,

    pageNumber: pdf.pageNumber,
  };
};

export const scaledToViewport = (
  scaled: Scaled,
  viewport: Viewport,
  usePdfCoordinates: boolean = false,
): LTWHP => {
  const { width, height } = viewport;

  if (usePdfCoordinates) {
    return pdfToViewport(scaled, viewport);
  }

  if (scaled.x1 === undefined) {
    throw new Error('You are using old position format, please update');
  }

  const x1 = (width * scaled.x1) / scaled.width;
  const y1 = (height * scaled.y1) / scaled.height;

  const x2 = (width * scaled.x2) / scaled.width;
  const y2 = (height * scaled.y2) / scaled.height;

  return {
    left: x1,
    top: y1,
    width: x2 - x1,
    height: y2 - y1,
    pageNumber: scaled.pageNumber,
  };
};
