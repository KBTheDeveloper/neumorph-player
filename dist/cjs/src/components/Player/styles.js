"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerStyles = void 0;
const Grid_1 = require("../../components/Grid/Grid");
const keyframes_1 = require("./../../../src/styles/jss/keyframes");
const guides_1 = require("../../utils/guides");
const mixins_1 = require("../../styles/jss/mixins");
const stylesInst = {
    "@keyframes fadeIn": keyframes_1.keyFrames["@keyframes fadeIn"],
    "@keyframes fadeOut": keyframes_1.keyFrames["@keyframes fadeOut"],
    ".controlsInner": {
        width: "100%",
    },
    "&.playerWrapper": {
        bottom: 0,
        left: 0,
        width: "100%",
        transition: "all .2s",
        transitionTimingFunction: "cubic-bezier(0.18, 0.89, 0.1, 1.04)",
        "&.hidden": {
            "& [class*=playerCurtain]": {
                visibility: "visible",
                transform: "translate(-50%, 0)",
            },
            transform: "translateY(100%)",
            transitionTimingFunction: "ease-out",
        },
        "&:hover": {
            "& > [class*=Player-playerCurtain]": {
                visibility: "visible",
                transform: "translate(-50%, 0)",
            },
        },
    },
    ".playerCurtain": {
        position: "absolute",
        display: "flex",
        visibility: "hidden",
        justifyContent: "center",
        left: "50%",
        transform: "translate(-50%, 30%)",
        top: -30,
        width: 40,
        height: 30,
        borderTopRightRadius: "50%",
        borderTopLeftRadius: "50%",
        transition: "all .1s ease-in-out",
        ...mixins_1.mixins.neuMorphismShadow(),
        ...mixins_1.mixins.neuMorphGradient({ first: guides_1.appPalette.darkPurple, second: guides_1.appPalette.darkPurple }, true),
        cursor: "pointer",
        "& [class*=iconWrapper]": {},
    },
    ".iconWrapper": {
        width: "30px !important",
        height: "30px !important",
    },
    [`@media${Grid_1.breakpoints.xs}`]: {
        ".player": {
            height: 145,
        },
    },
    ".volumeSlider": {
        minWidth: 250,
        writingMode: "bt-lr" /* IE */,
        "-webkit-appearance": "none" /* Chromium */,
        width: "100%",
        height: 10,
        borderRadius: 5,
        transform: "rotate(-90deg)",
        "&::-webkit-slider-thumb": {
            width: 15,
            height: 15,
            "-webkit-appearance": "none",
            appearance: "none",
            border: `1px solid ${guides_1.appPalette.orange}`,
            borderRadius: "50%",
            backgroundColor: guides_1.appPalette.orange,
            cursor: "pointer",
            // marginLeft: -5,
            /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
            boxShadow: `0px 0px 5px ${guides_1.appPalette.orange}, 0px 0px 1px ${guides_1.appPalette.orange}` /* Add cool effects to your sliders! */,
        },
        "&::-ms-track": {
            width: "100%",
            cursor: "pointer",
            /* Hides the slider so custom styles can be added */
            background: "transparent",
            borderColor: "transparent",
            color: "transparent",
            // border-radius: @track-radius;
            // border: @track-border-width solid @track-border-color;
        },
    },
    ".sliderBtn": {
        "&.toggled": {
            boxShadow: `0px 0px 0px 4px rgb(${guides_1.appPalette.orangeRgb}) !important`,
        },
        transition: "all .3s ease",
    },
};
exports.playerStyles = stylesInst;
//# sourceMappingURL=styles.js.map