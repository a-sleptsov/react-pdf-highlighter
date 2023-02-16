"use strict";
// "viewport" rectangle is { top, left, width, height }
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaledToViewport = exports.viewportToScaled = void 0;
const PAGE_NUMBER_KEY = 'pageNumber';
const getScaledRect = (rect, scale) => {
    const newRect = Object.assign({}, rect);
    const rectEntries = Object.entries(newRect);
    rectEntries.forEach(([key, value]) => {
        if (key !== PAGE_NUMBER_KEY) {
            newRect[key] = value / scale;
        }
    });
    return newRect;
};
const viewportToScaled = (rect, { width, height, scale, }) => {
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
exports.viewportToScaled = viewportToScaled;
const pdfToViewport = (pdf, viewport) => {
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
const scaledToViewport = (scaled, viewport, usePdfCoordinates = false) => {
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
exports.scaledToViewport = scaledToViewport;
//# sourceMappingURL=coordinates.js.map