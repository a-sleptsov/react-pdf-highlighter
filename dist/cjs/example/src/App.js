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
const react_1 = __importStar(require("react"));
const react_pdf_highlighter_1 = require("./react-pdf-highlighter");
const test_highlights_1 = require("./test-highlights");
const Spinner_1 = require("./Spinner");
const Sidebar_1 = require("./Sidebar");
require("./style/App.css");
const testHighlights = test_highlights_1.testHighlights;
const getNextId = () => String(Math.random()).slice(2);
const parseIdFromHash = () => document.location.hash.slice("#highlight-".length);
const resetHash = () => {
    document.location.hash = "";
};
const HighlightPopup = ({ comment, }) => comment.text ? (react_1.default.createElement("div", { className: "Highlight__popup" },
    comment.emoji,
    " ",
    comment.text)) : null;
const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";
const searchParams = new URLSearchParams(document.location.search);
const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;
class App extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            url: initialUrl,
            highlights: testHighlights[initialUrl]
                ? [...testHighlights[initialUrl]]
                : [],
        };
        this.resetHighlights = () => {
            this.setState({
                highlights: [],
            });
        };
        this.toggleDocument = () => {
            const newUrl = this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;
            this.setState({
                url: newUrl,
                highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
            });
        };
        this.scrollViewerTo = (highlight) => { };
        this.scrollToHighlightFromHash = () => {
            const highlight = this.getHighlightById(parseIdFromHash());
            if (highlight) {
                this.scrollViewerTo(highlight);
            }
        };
    }
    componentDidMount() {
        window.addEventListener("hashchange", this.scrollToHighlightFromHash, false);
    }
    getHighlightById(id) {
        const { highlights } = this.state;
        return highlights.find((highlight) => highlight.id === id);
    }
    addHighlight(highlight) {
        const { highlights } = this.state;
        console.log("Saving highlight", highlight);
        this.setState({
            highlights: [Object.assign(Object.assign({}, highlight), { id: getNextId() }), ...highlights],
        });
    }
    updateHighlight(highlightId, position, content) {
        console.log("Updating highlight", highlightId, position, content);
        this.setState({
            highlights: this.state.highlights.map((h) => {
                const { id, position: originalPosition, content: originalContent } = h, rest = __rest(h, ["id", "position", "content"]);
                return id === highlightId
                    ? Object.assign({ id, position: Object.assign(Object.assign({}, originalPosition), position), content: Object.assign(Object.assign({}, originalContent), content) }, rest) : h;
            }),
        });
    }
    render() {
        const { url, highlights } = this.state;
        return (react_1.default.createElement("div", { className: "App", style: { display: "flex", height: "100vh" } },
            react_1.default.createElement(Sidebar_1.Sidebar, { highlights: highlights, resetHighlights: this.resetHighlights, toggleDocument: this.toggleDocument }),
            react_1.default.createElement("div", { style: {
                    height: "100vh",
                    width: "75vw",
                    position: "relative",
                } },
                react_1.default.createElement(react_pdf_highlighter_1.PdfLoader, { url: url, beforeLoad: react_1.default.createElement(Spinner_1.Spinner, null) }, (pdfDocument) => (react_1.default.createElement(react_pdf_highlighter_1.PdfHighlighter, { pdfDocument: pdfDocument, enableAreaSelection: (event) => event.altKey, onScrollChange: resetHash, 
                    // pdfScaleValue="page-width"
                    scrollRef: (scrollTo) => {
                        this.scrollViewerTo = scrollTo;
                        this.scrollToHighlightFromHash();
                    }, onSelectionFinished: (position, content, hideTipAndSelection, transformSelection) => (react_1.default.createElement(react_pdf_highlighter_1.Tip, { onOpen: transformSelection, onConfirm: (comment) => {
                            this.addHighlight({ content, position, comment });
                            hideTipAndSelection();
                        } })), highlightTransform: (highlight, index, setTip, hideTip, viewportToScaled, screenshot, isScrolledTo) => {
                        const isTextHighlight = !Boolean(highlight.content && highlight.content.image);
                        const component = isTextHighlight ? (react_1.default.createElement(react_pdf_highlighter_1.Highlight, { isScrolledTo: isScrolledTo, position: highlight.position, comment: highlight.comment })) : (react_1.default.createElement(react_pdf_highlighter_1.AreaHighlight, { isScrolledTo: isScrolledTo, highlight: highlight, onChange: (boundingRect) => {
                                this.updateHighlight(highlight.id, { boundingRect: viewportToScaled(boundingRect) }, { image: screenshot(boundingRect) });
                            } }));
                        return (react_1.default.createElement(react_pdf_highlighter_1.Popup, { popupContent: react_1.default.createElement(HighlightPopup, Object.assign({}, highlight)), onMouseOver: (popupContent) => setTip(highlight, (highlight) => popupContent), onMouseOut: hideTip, key: index, children: component }));
                    }, highlights: highlights }))))));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map