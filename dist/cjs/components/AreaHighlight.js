"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaHighlight = void 0;
const react_1 = __importStar(require("react"));
const react_rnd_1 = require("react-rnd");
const pdfjs_dom_1 = require("../lib/pdfjs-dom");
require("../style/AreaHighlight.css");
const AreaHighlight = (_a) => {
    var { highlight, onChange, isScrolledTo } = _a, otherProps = __rest(_a, ["highlight", "onChange", "isScrolledTo"]);
    const areaHighlightPosition = (0, react_1.useMemo)(() => ({
        x: highlight.position.boundingRect.left,
        y: highlight.position.boundingRect.top,
    }), [highlight.position.boundingRect.left, highlight.position.boundingRect.top]);
    const areaHighlightSize = (0, react_1.useMemo)(() => ({
        width: highlight.position.boundingRect.width,
        height: highlight.position.boundingRect.height,
    }), [highlight.position.boundingRect.width, highlight.position.boundingRect.height]);
    const onDragStop = (0, react_1.useCallback)((_, data) => {
        const boundingRect = Object.assign(Object.assign({}, highlight.position.boundingRect), { top: data.y, left: data.x });
        onChange(boundingRect);
    }, [highlight.position.boundingRect, onChange]);
    const onResizeStop = (0, react_1.useCallback)((_mouseEvent, _direction, ref, _delta, position) => {
        var _a;
        const boundingRect = {
            top: position.y,
            left: position.x,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            pageNumber: ((_a = (0, pdfjs_dom_1.getPageFromElement)(ref)) === null || _a === void 0 ? void 0 : _a.number) || -1,
        };
        onChange(boundingRect);
    }, [onChange]);
    const handleClick = (0, react_1.useCallback)((event) => {
        event.stopPropagation();
        event.preventDefault();
    }, []);
    return (react_1.default.createElement(react_rnd_1.Rnd, Object.assign({ className: `AreaHighlight ${isScrolledTo ? 'scrolledTo' : ''}`, onDragStop: onDragStop, onResizeStop: onResizeStop, position: areaHighlightPosition, size: areaHighlightSize, onClick: handleClick }, otherProps)));
};
exports.AreaHighlight = AreaHighlight;
exports.default = exports.AreaHighlight;
//# sourceMappingURL=AreaHighlight.js.map