"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconWrapper = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Icon_1 = require("./Icon");
const IconWrapperSC = styled_components_1.default.div((props) => ({
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: props.width || 40,
    height: props.height || 40,
    ...(props.onClick && { cursor: "pointer" }),
    ...props.customStyle,
    ...(props.disabled && {
        pointerEvents: "none",
        opacity: 0.6,
    }),
}));
const IconWrapper = function (props) {
    const customStyles = props.styles?.name || "";
    const height = props.sizes?.height ?? "25";
    const width = props.sizes?.width ?? "25";
    const vb = props.sizes?.viewBox ?? null;
    const icon = props.icon ? (react_1.default.createElement(Icon_1.Icon, { width: width, height: height, color: props.color, icon: props.icon, iconName: null })) : (react_1.default.createElement(Icon_1.Icon, { width: width, viewBox: vb, height: height, color: props.color, noAlign: props.noAlign, iconName: props.iconName }));
    const classes = props.classes || "";
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(IconWrapperSC, { title: props.title, role: props.role, tabIndex: props.tabIndex, onClick: props.onClick, customStyle: props.styles, width: props.sizes?.width, disabled: props.disabled, height: props.sizes?.height, className: `${classes} ${customStyles}`, onKeyPress: props.onKeyPress }, icon)));
};
exports.IconWrapper = IconWrapper;
//# sourceMappingURL=IconWrapper.js.map