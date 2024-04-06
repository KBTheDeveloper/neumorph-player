"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = __importDefault(require("react"));
const mixins_1 = require("../../styles/jss/mixins");
const guides_1 = require("../../utils/guides");
const styled_components_1 = __importDefault(require("styled-components"));
const ButtonSC = styled_components_1.default.button((props) => ({
    "&.button": {
        position: "relative",
        border: "1px solid transparent",
        fontWeight: 700,
        padding: "10px 5.5rem",
        ...mixins_1.mixins.neuMorphismShadow("4px 4px 8px rgba(0, 0, 0, 0.1)", "-4px -4px 8px rgba(255, 255, 255, 0.06)"),
        textTransform: "uppercase",
        borderRadius: 5,
        fontSize: "1.4em",
        cursor: "pointer",
        maxWidth: "100%",
        "&.visible ": {
            display: "block",
        },
        overflow: "hidden",
        transition: "all .1s linear",
        "&:focus": {
            ...mixins_1.mixins.neuMorphismShadow("inset -4px -4px 8px rgba(255, 255, 255, 0.06)", "inset 4px 4px 8px rgba(255, 255, 255, 0.06)"),
        },
        "&--white": {
            backgroundColor: guides_1.appPalette.white,
            color: guides_1.appPalette.darkGrey,
            "&:hover": {
                backgroundColor: guides_1.appPalette.lightGrey,
            },
        },
        "&--violet": {
            ...mixins_1.mixins.neuMorphGradient({ first: "#4C155D", second: "#2A1433" }),
            color: guides_1.appPalette.white,
            "&:hover": {
                ...mixins_1.mixins.neuMorphGradient({ first: "#2A1433", second: "#4C155D" }),
            },
        },
        "&--violet-gradient": {
            ...mixins_1.mixins.neuMorphGradient({ first: "#6E16D2", second: "#350C64" }),
            color: guides_1.appPalette.white,
            borderColor: "#482C84",
            "&:hover": {
                ...mixins_1.mixins.neuMorphGradient({ first: "#350C64", second: "#6E16D2" }),
            },
        },
        "&--transparent": {
            boxShadow: "none",
            background: "transparent !important",
            color: guides_1.appPalette[props.color],
            "&:focus": {
                boxShadow: "none !important",
            },
        },
        ...props.styles,
    },
    "&.close-btn--cross": {
        cursor: "pointer",
        width: 30,
        height: 30,
        position: "absolute",
        right: 5,
        top: -35,
        svg: {
            fill: guides_1.appPalette.white,
        },
    },
    "&.playlist__item-play-btn": {
        width: 30,
        height: 30,
        display: "none",
    },
    "&:disabled": {
        backgroundColor: `${guides_1.appPalette.lightGrey} !important`,
    },
    "&.fab ": {
        padding: 0,
        margin: 0,
        display: "flex",
        borderRadius: "50%",
        backgroundColor: "transparent",
        overflow: "hidden",
    },
    "&.fab--medium": {
        width: 50,
        height: 50,
    },
    "&.fab--small": {
        width: 30,
        height: 30,
    },
    "&.button--orange": {
        backgroundColor: guides_1.appPalette.orange,
        color: guides_1.appPalette.white,
    },
    "&.button--white": {
        backgroundColor: guides_1.appPalette.white,
        color: guides_1.appPalette.darkGrey,
        "&:hover": {
            backgroundColor: guides_1.appPalette.lightGrey,
        },
    },
    "&.button--small": {
        padding: "10px 2rem",
        fontSize: 18,
    },
}));
const rippleProps = [
    { name: "x", value: "clientX" },
    { name: "y", value: "clientY" },
    { name: "width", value: "clientWidth" },
    { name: "height", value: "clientHeight" },
    { name: "left", value: "offsetLeft" },
    { name: "top", value: "offsetTop" },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.Button = react_1.default.forwardRef((props, ref) => {
    const onClick = (e) => {
        if (props.clickHandler) {
            props.clickHandler(e);
        }
        const button = e.currentTarget;
        const ripple = document.createElement("ripple-element");
        const existedRipple = e.currentTarget.getElementsByTagName("ripple-element")[0];
        if (existedRipple) {
            existedRipple.remove();
        }
        for (const prop of rippleProps) {
            ripple.setAttribute(prop.name, (prop.name == "x" || prop.name == "y" ? e : button)[prop.value]);
        }
        e.currentTarget.appendChild(ripple);
    };
    const cls = props.classes ? `${props.classes.map((item) => item).join(" ")} ` : "";
    const classes = `button ${cls} ${props.view && /fab/.test(props.view) ? `fab ${props.view}` : props.view ? ` ${props.view}` : " "}${props.color ? " " + `button--${props.color}` : ""}${props.visibility ? " visible" : ""}`;
    const buttonTemplate = props.href ? (react_1.default.createElement("a", { style: { color: guides_1.appPalette[props.color] }, href: String(props.href), className: classes }, props.text)) : (react_1.default.createElement(ButtonSC, { tabIndex: '0', color: props.color, disabled: props.disabled, className: classes, type: props.type, id: props.id, onClick: onClick },
        props.icon && (react_1.default.createElement("svg", { width: props.icon.width, height: props.icon.height, viewBox: props.icon.viewBox },
            react_1.default.createElement("rect", { fill: props.color, width: '100%', height: '100%' }),
            react_1.default.createElement("path", { d: props.icon.path }))),
        props.text,
        props.children));
    return react_1.default.createElement(react_1.default.Fragment, null, buttonTemplate);
});
exports.Button.displayName = "Button";
//# sourceMappingURL=Button.js.map