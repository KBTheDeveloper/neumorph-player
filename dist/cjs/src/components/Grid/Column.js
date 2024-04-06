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
const styled_components_1 = __importDefault(require("styled-components"));
const Grid_1 = require("./Grid");
const calcColsInPercents = (size) => `${(+size / 12) * 100}%`;
const createSelector = (point, props) => {
    const name = `@media${Grid_1.breakpoints[point]}`;
    return { [name]: props };
};
const generateProps = (propValue, type) => {
    const props = {
        cols: {
            flex: `0 0 ${calcColsInPercents(propValue)}`,
            maxWidth: calcColsInPercents(propValue),
        },
        order: {
            order: propValue,
        },
        offset: {
            marginLeft: calcColsInPercents(propValue),
        },
        verticalAlign: {
            alignItems: propValue,
        },
        horizontalAlign: {
            justifyContent: propValue,
        },
    };
    return props[type];
};
const createMediaQuery = (points, type, prop) => {
    const mediaQueries = {};
    for (const point in points) {
        if (prop && prop[point] && point !== "default") {
            Object.assign(mediaQueries, createSelector(point, generateProps(prop[point], type)));
        }
    }
    return mediaQueries;
};
const createMediaQueries = (points, props) => {
    const types = ["cols", "offset", "horizontalAlign", "verticalAlign", "order"];
    let mediaQueries = {};
    types.forEach((type) => (mediaQueries = { ...mediaQueries, ...createMediaQuery(points, type, props[type]) }));
    return mediaQueries;
};
const ColumnSC = styled_components_1.default.div((props) => ({
    ...(props.cols?.default && { flex: `0 0 ${(props.cols.default / 12) * 100}%` }),
    maxWidth: (props.cols.default / 12) * 100 + "%",
    paddingLeft: `${Grid_1.gridOptions.gutter}px`,
    paddingRight: `${Grid_1.gridOptions.gutter}px`,
    ...(props.colOffset && props.colOffset?.default && { marginLeft: `${(props.colOffset.default / 12) * 100}%` }),
    ...(props.colOrder && props.colOrder?.default && { order: props.colOrder.default }),
    width: "100%",
    "-webkit-box-flex": 0,
    ...createMediaQueries(Grid_1.breakpoints, {
        cols: props.cols,
        offset: props.colOffset,
        order: props.colOrder,
        verticalAlign: props.align?.vertical,
        horizontalAlign: props.align?.horizontal,
    }),
}));
const Column = (props) => {
    const classesString = props.classes || "";
    const colOffset = props.offset;
    const colOrder = props.order;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ColumnSC, { style: props.style, colOffset: colOffset, colOrder: colOrder, align: props.align, cols: props.cols, className: classesString }, props.children)));
};
exports.default = (0, react_1.memo)(Column);
//# sourceMappingURL=Column.js.map