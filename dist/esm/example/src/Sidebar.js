import React from "react";
const updateHash = (highlight) => {
    document.location.hash = `highlight-${highlight.id}`;
};
export function Sidebar({ highlights, toggleDocument, resetHighlights, }) {
    return (React.createElement("div", { className: "sidebar", style: { width: "25vw" } },
        React.createElement("div", { className: "description", style: { padding: "1rem" } },
            React.createElement("h2", { style: { marginBottom: "1rem" } }, "react-pdf-highlighter"),
            React.createElement("p", { style: { fontSize: "0.7rem" } },
                React.createElement("a", { href: "https://github.com/agentcooper/react-pdf-highlighter" }, "Open in GitHub")),
            React.createElement("p", null,
                React.createElement("small", null, "To create area highlight hold \u2325 Option key (Alt), then click and drag."))),
        React.createElement("ul", { className: "sidebar__highlights" }, highlights.map((highlight, index) => (React.createElement("li", { key: index, className: "sidebar__highlight", onClick: () => {
                updateHash(highlight);
            } },
            React.createElement("div", null,
                React.createElement("strong", null, highlight.comment.text),
                highlight.content.text ? (React.createElement("blockquote", { style: { marginTop: "0.5rem" } }, `${highlight.content.text.slice(0, 90).trim()}…`)) : null,
                highlight.content.image ? (React.createElement("div", { className: "highlight__image", style: { marginTop: "0.5rem" } },
                    React.createElement("img", { src: highlight.content.image, alt: "Screenshot" }))) : null),
            React.createElement("div", { className: "highlight__location" },
                "Page ",
                highlight.position.pageNumber))))),
        React.createElement("div", { style: { padding: "1rem" } },
            React.createElement("button", { onClick: toggleDocument }, "Toggle PDF document")),
        highlights.length > 0 ? (React.createElement("div", { style: { padding: "1rem" } },
            React.createElement("button", { onClick: resetHighlights }, "Reset highlights"))) : null));
}
//# sourceMappingURL=Sidebar.js.map