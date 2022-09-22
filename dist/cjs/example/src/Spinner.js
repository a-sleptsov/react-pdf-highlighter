"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
const react_1 = __importDefault(require("react"));
require("./style/Spinner.css");
function Spinner() {
    return (react_1.default.createElement("div", { style: {
            display: "flex",
            alignItems: "center",
            height: "100vh",
        } },
        react_1.default.createElement("div", { className: "sk-fading-circle" },
            react_1.default.createElement("div", { className: "sk-circle1 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle2 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle3 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle4 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle5 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle6 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle7 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle8 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle9 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle10 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle11 sk-circle" }),
            react_1.default.createElement("div", { className: "sk-circle12 sk-circle" }))));
}
exports.Spinner = Spinner;
//# sourceMappingURL=Spinner.js.map