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
exports.gridOptions = exports.breakpoints = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const aligns = {
    horizontal: {
        start: "start",
        end: "end",
        center: "center",
        between: "space-between",
        around: "space-around",
        evenly: "space-evenly",
        stretch: "stretch",
        unset: "unset",
    },
    vertical: {
        start: "start",
        end: "end",
        center: "center",
        "flex-start": "flex-start",
        "flex-end": "flex-end",
        stretch: "stretch",
        unset: "unset",
    },
};
exports.breakpoints = {
    xs: "(max-width: 576px)",
    sm: "(min-width: 576px) and (max-width: 767.98px)",
    md: "(min-width: 768px) and (max-width: 1199.98px)",
    lg: "(min-width: 1200px) and (max-width: 1399.98px)",
    xl: "(min-width: 1400px)",
};
const createAlignObject = (props, axis) => {
    const alignObject = { xl: "unset" };
    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            alignObject[key] = aligns[axis][value] || aligns[axis].unset;
        });
    }
    return alignObject;
};
const createMediaQueries = (props, propName) => {
    return typeof props === "object"
        ? Object.entries(props)
            .map(([key, value]) => {
            if (value !== "unset")
                return `@media${exports.breakpoints[key]}{\n ${propName}: ${aligns.horizontal[value]}; \n}; \n`;
        })
            .join("")
        : "";
};
exports.gridOptions = { gutter: 15 };
const GridSC = styled_components_1.default.div((props) => {
    const defaultAligns = {
        vertical: createAlignObject(props.align.vertical, "vertical"),
        horizontal: createAlignObject(props.align.horizontal, "horizontal"),
    };
    const defaultDir = props.dir || "row";
    const defaultWrap = props.dir || "wrap";
    const alignHorMQueries = createMediaQueries(defaultAligns.horizontal, "justify-content") || "";
    const alignVertMQueries = createMediaQueries(defaultAligns.vertical, "align-items") || "";
    return `
  display: flex;
  flex-flow: ${defaultDir} ${defaultWrap};
  justify-content: ${defaultAligns.horizontal.xl};
  align-items: ${defaultAligns.vertical.xl};
  margin-left: ${-exports.gridOptions.gutter}px;
  margin-right: ${-exports.gridOptions.gutter}px;
  ${alignHorMQueries}
  ${alignVertMQueries}`;
});
const Grid = (props) => {
    const classes = "grid";
    const horizontal = props.align?.horizontal || { xl: "offset" };
    const vertical = props.align?.vertical || { xl: "offset" };
    return (react_1.default.createElement(GridSC, { align: {
            horizontal,
            vertical,
        }, dir: props.dir, wrap: props.wrap, className: classes }, props.children));
};
exports.default = (0, react_1.memo)(Grid);
//# sourceMappingURL=Grid.js.map