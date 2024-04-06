"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const guides_1 = require("../../utils/guides");
const styled_components_1 = __importDefault(require("styled-components"));
const TooltipSC = styled_components_1.default.div((props) => ({
    position: "fixed",
    borderRadius: 5,
    display: props.show ? "block" : "none",
    boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.33)",
    backgroundColor: guides_1.appPalette[props.theme],
    "&.tooltip--arrow_bottom": {
        "&:before": {
            content: "''",
            display: "block",
            position: "absolute",
            transform: "translateX(-50%)",
            left: "50%",
            bottom: -4,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid #fff",
        },
    },
}));
const Tooltip = (0, react_1.memo)((props) => {
    const ref = (0, react_1.useRef)(null);
    const defaultTheme = props.theme || "white";
    const dir = props.dir ? `tooltip--arrow_${props.dir}` : "tooltip--default";
    return (react_1.default.createElement(TooltipSC, { className: `tooltip ${dir} px-2 py-1`, theme: defaultTheme, show: props.show, style: { top: props.position.y, left: props.position.x }, ref: ref },
        react_1.default.createElement("span", null, props.text)));
});
Tooltip.displayName = "Tooltip";
exports.default = Tooltip;
//# sourceMappingURL=index.js.map