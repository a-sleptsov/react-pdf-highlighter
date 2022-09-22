import React from 'react';
import '../style/Highlight.css';
const EMPTY_FUNC = () => { };
export const Highlight = ({ position, onClick, onMouseOver, onMouseOut, comment, isScrolledTo, }) => {
    const { rects, boundingRect } = position;
    return (React.createElement("div", { className: `Highlight ${isScrolledTo ? 'Highlight--scrolledTo' : ''}` },
        comment ? (React.createElement("div", { className: "Highlight__emoji", style: {
                left: 20,
                top: boundingRect.top,
            } }, comment.emoji)) : null,
        React.createElement("div", { className: "Highlight__parts" }, rects.map((rect) => (React.createElement("div", { role: "button", "aria-label": "Highlight part", tabIndex: -1, onKeyDown: (event) => event.preventDefault(), onBlur: (event) => event.preventDefault(), onFocus: (event) => event.preventDefault(), onMouseOver: onMouseOver, onMouseOut: onMouseOut, onClick: onClick, key: rect.left, style: rect, className: "Highlight__part" }))))));
};
Highlight.defaultProps = {
    onClick: EMPTY_FUNC,
    onMouseOver: EMPTY_FUNC,
    onMouseOut: EMPTY_FUNC,
};
export default Highlight;
//# sourceMappingURL=Highlight.js.map