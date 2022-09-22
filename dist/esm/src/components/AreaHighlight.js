var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useMemo } from 'react';
import { Rnd } from 'react-rnd';
import { getPageFromElement } from '../lib/pdfjs-dom';
import '../style/AreaHighlight.css';
export const AreaHighlight = (_a) => {
    var { highlight, onChange, isScrolledTo } = _a, otherProps = __rest(_a, ["highlight", "onChange", "isScrolledTo"]);
    const areaHighlightPosition = useMemo(() => ({
        x: highlight.position.boundingRect.left,
        y: highlight.position.boundingRect.top,
    }), [highlight.position.boundingRect.left, highlight.position.boundingRect.top]);
    const areaHighlightSize = useMemo(() => ({
        width: highlight.position.boundingRect.width,
        height: highlight.position.boundingRect.height,
    }), [highlight.position.boundingRect.width, highlight.position.boundingRect.height]);
    const onDragStop = useCallback((_, data) => {
        const boundingRect = Object.assign(Object.assign({}, highlight.position.boundingRect), { top: data.y, left: data.x });
        onChange(boundingRect);
    }, [highlight.position.boundingRect, onChange]);
    const onResizeStop = useCallback((_mouseEvent, _direction, ref, _delta, position) => {
        var _a;
        const boundingRect = {
            top: position.y,
            left: position.x,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            pageNumber: ((_a = getPageFromElement(ref)) === null || _a === void 0 ? void 0 : _a.number) || -1,
        };
        onChange(boundingRect);
    }, [onChange]);
    const handleClick = useCallback((event) => {
        event.stopPropagation();
        event.preventDefault();
    }, []);
    return (React.createElement(Rnd, Object.assign({ className: `AreaHighlight ${isScrolledTo ? 'scrolledTo' : ''}`, onDragStop: onDragStop, onResizeStop: onResizeStop, position: areaHighlightPosition, size: areaHighlightSize, onClick: handleClick }, otherProps)));
};
export default AreaHighlight;
//# sourceMappingURL=AreaHighlight.js.map