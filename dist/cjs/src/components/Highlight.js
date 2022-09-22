"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Highlight = void 0;
const react_1 = __importDefault(require("react"));
require("../style/Highlight.css");
const EMPTY_FUNC = () => { };
const Highlight = ({ position, onClick, onMouseOver, onMouseOut, comment, isScrolledTo, }) => {
    const { rects, boundingRect } = position;
    return (react_1.default.createElement("div", { className: `Highlight ${isScrolledTo ? 'Highlight--scrolledTo' : ''}` },
        comment ? (react_1.default.createElement("div", { className: "Highlight__emoji", style: {
                left: 20,
                top: boundingRect.top,
            } }, comment.emoji)) : null,
        react_1.default.createElement("div", { className: "Highlight__parts" }, rects.map((rect) => (react_1.default.createElement("div", { role: "button", "aria-label": "Highlight part", tabIndex: -1, onKeyDown: (event) => event.preventDefault(), onBlur: (event) => event.preventDefault(), onFocus: (event) => event.preventDefault(), onMouseOver: onMouseOver, onMouseOut: onMouseOut, onClick: onClick, key: rect.left, style: rect, className: "Highlight__part" }))))));
};
exports.Highlight = Highlight;
exports.Highlight.defaultProps = {
    onClick: EMPTY_FUNC,
    onMouseOver: EMPTY_FUNC,
    onMouseOut: EMPTY_FUNC,
};
exports.default = exports.Highlight;
//# sourceMappingURL=Highlight.js.map