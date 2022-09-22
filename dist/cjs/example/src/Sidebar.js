"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const react_1 = __importDefault(require("react"));
const updateHash = (highlight) => {
    document.location.hash = `highlight-${highlight.id}`;
};
function Sidebar({ highlights, toggleDocument, resetHighlights, }) {
    return (react_1.default.createElement("div", { className: "sidebar", style: { width: "25vw" } },
        react_1.default.createElement("div", { className: "description", style: { padding: "1rem" } },
            react_1.default.createElement("h2", { style: { marginBottom: "1rem" } }, "react-pdf-highlighter"),
            react_1.default.createElement("p", { style: { fontSize: "0.7rem" } },
                react_1.default.createElement("a", { href: "https://github.com/agentcooper/react-pdf-highlighter" }, "Open in GitHub")),
            react_1.default.createElement("p", null,
                react_1.default.createElement("small", null, "To create area highlight hold \u2325 Option key (Alt), then click and drag."))),
        react_1.default.createElement("ul", { className: "sidebar__highlights" }, highlights.map((highlight, index) => (react_1.default.createElement("li", { key: index, className: "sidebar__highlight", onClick: () => {
                updateHash(highlight);
            } },
            react_1.default.createElement("div", null,
                react_1.default.createElement("strong", null, highlight.comment.text),
                highlight.content.text ? (react_1.default.createElement("blockquote", { style: { marginTop: "0.5rem" } }, `${highlight.content.text.slice(0, 90).trim()}…`)) : null,
                highlight.content.image ? (react_1.default.createElement("div", { className: "highlight__image", style: { marginTop: "0.5rem" } },
                    react_1.default.createElement("img", { src: highlight.content.image, alt: "Screenshot" }))) : null),
            react_1.default.createElement("div", { className: "highlight__location" },
                "Page ",
                highlight.position.pageNumber))))),
        react_1.default.createElement("div", { style: { padding: "1rem" } },
            react_1.default.createElement("button", { onClick: toggleDocument }, "Toggle PDF document")),
        highlights.length > 0 ? (react_1.default.createElement("div", { style: { padding: "1rem" } },
            react_1.default.createElement("button", { onClick: resetHighlights }, "Reset highlights"))) : null));
}
exports.Sidebar = Sidebar;
//# sourceMappingURL=Sidebar.js.map