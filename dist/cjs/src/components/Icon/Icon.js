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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
const react_1 = __importStar(require("react"));
const guides_1 = require("../../utils/guides");
const IconsList_1 = require("./IconsList");
const Icon = (props) => {
    const pathRef = (0, react_1.useRef)(null);
    const defaultViewBox = "0 0 25 25";
    const defaultColor = props.color || "white";
    const [y, setY] = (0, react_1.useState)(0);
    const [x, setX] = (0, react_1.useState)(0);
    const getBoxCenter = () => {
        const vb = (props.viewBox || defaultViewBox).split(" ");
        const sizes = pathRef.current ? pathRef.current?.getBBox() : null;
        if (sizes) {
            const y = (+vb[3] - sizes.height) / 2 - sizes.y;
            const x = (+vb[2] - sizes.width) / 2 - sizes.x;
            setX(x < 0 ? 0 : x);
            setY(y);
        }
    };
    (0, react_1.useEffect)(() => {
        getBoxCenter();
    });
    const icon = props.iconName ? IconsList_1.iconsList[props.iconName] : props.icon;
    const sizes = { width: props.width || 25, height: props.height || 25, viewBox: props.viewBox || defaultViewBox };
    const noAlign = !props.noAlign && { transform: `translate(${x}, ${y})` };
    const svg = props.iconName ? (react_1.default.createElement("svg", { width: sizes.width, height: sizes.height, fill: guides_1.appPalette[defaultColor], viewBox: sizes.viewBox },
        react_1.default.createElement("path", { ...noAlign, ref: pathRef, d: icon }))) : (react_1.default.createElement("svg", { width: sizes.width, height: sizes.height, fill: props.icon.color, viewBox: props.viewBox },
        react_1.default.createElement("path", { ...noAlign, ref: pathRef, d: props.icon.d })));
    return react_1.default.createElement(react_1.default.Fragment, null, svg);
};
exports.Icon = Icon;
//# sourceMappingURL=Icon.js.map