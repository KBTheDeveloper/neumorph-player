"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistStyles = exports.volumeStyles = exports.playerStyles = exports.progressStyles = exports.buttonStyles = void 0;
const mixins_1 = require("../../../styles/jss/mixins");
const guides_1 = require("../../../utils/guides");
const Grid_1 = require("../../Grid/Grid");
const playerGeneralStyles = {
    width: "100%",
    height: 150,
    position: "relative",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    ...mixins_1.mixins.neuMorphismShadow("inset 1px 2px 1px rgba(255, 255, 255, 0.06)", "inset -1px -2px 1px rgba(49, 48, 65, 0.25)"),
};
const playerStyles = {
    dark: {
        ...playerGeneralStyles,
        boxShadow: `12px 12px 24px #171621,
    -12px -12px 24px #252435;`,
        backgroundColor: guides_1.appPalette.darkPurple,
    },
    light: {
        ...playerGeneralStyles,
        background: guides_1.appPalette.white,
        ".track-info__name, .track-info__artist-name, .time": {
            color: "#4A4A4A",
        },
    },
    "dark-red": {
        ...playerGeneralStyles,
        backgroundColor: guides_1.appPalette.vinous.main,
    },
    blue: {
        ...playerGeneralStyles,
        backgroundColor: guides_1.appPalette.blue.main,
    },
};
exports.playerStyles = playerStyles;
const generalButtonStyles = {
    boxShadow: "inset 1px 2px 1px rgba(255, 255, 255, 0.06), " +
        "inset -10px -10px 52px rgba(49, 48, 65, 0.25)," +
        " 8px 8px 12px rgba(0, 0, 0, 0.25), -8px -8px 12px rgba(63, 63, 65, 0.25)",
};
const genButtonStyles = ({ defaultButton, playButton, shadow, }) => ({
    playButton: {
        boxShadow: shadow,
        background: playButton.bg,
        "&:hover": {
            background: playButton.hoverBg,
        },
    },
    defaultButton: {
        boxShadow: shadow,
        background: defaultButton.bg,
        "&:hover": {
            background: defaultButton.hoverBg,
        },
    },
});
const buttonShadows = {
    dark: "inset 1px 2px 1px rgba(255, 255, 255, 0.06), " +
        "inset -10px -10px 52px rgba(49, 48, 65, 0.25)," +
        " 2px 2px 3px rgba(0, 0, 0, 0.4), -2px -2px 3px rgba(67, 67, 70, 0.4)",
    light: "inset 1px 2px 1px rgba(255, 255, 255, 0.06), " +
        "inset -10px -10px 52px rgba(49, 48, 65, 0.25)," +
        " 2px 2px 3px rgba(174, 174, 192, 0.4), -2px -2px 3px #FFFFFF",
    blue: "inset 1px 2px 1px rgba(255, 255, 255, 0.06), " +
        "inset -10px -10px 52px rgba(49, 48, 65, 0.25)," +
        " 2px 2px 3px #242E9B, -2px -2px 3px rgba(107, 96, 255, 0.25)",
};
const buttonStyles = {
    dark: {
        ...genButtonStyles({
            playButton: {
                bg: "linear-gradient(180deg, #7334AE 0%, rgba(85, 29, 112, 0.93) 100%)",
                hoverBg: `linear-gradient(145deg, ${guides_1.appPalette.violet2} 0%, ${guides_1.appPalette.violet} 100%)`,
            },
            defaultButton: {
                bg: "linear-gradient(142.84deg, rgba(43, 42, 62, 0.93) 16.64%, #1E1D2B 86.06%)",
                hoverBg: `linear-gradient(145deg, ${guides_1.appPalette.violet2} 0%, ${guides_1.appPalette.violet} 100%)`,
            },
            shadow: buttonShadows.dark,
        }),
    },
    light: {
        ...genButtonStyles({
            playButton: {
                bg: guides_1.appPalette.light.playButtonGradient,
                hoverBg: guides_1.appPalette.light.playButtonHoverGradient,
            },
            defaultButton: {
                bg: guides_1.appPalette.light.lightGradient,
                hoverBg: guides_1.appPalette.light.lightGradientRev,
            },
            shadow: buttonShadows.light,
        }),
    },
    blue: {
        ...genButtonStyles({
            playButton: {
                bg: guides_1.appPalette.blue.blueSkyGradient,
                hoverBg: guides_1.appPalette.blue.blueSkyGradientRev,
            },
            defaultButton: {
                bg: guides_1.appPalette.blue.lightBlueGradient,
                hoverBg: guides_1.appPalette.blue.lightBlueGradientRev,
            },
            shadow: buttonShadows.blue,
        }),
    },
};
exports.buttonStyles = buttonStyles;
const progressStyles = {
    dark: {
        progressLine: {
            fill: `${guides_1.appPalette.white} !important`,
        },
    },
    light: {
        progressLine: {
            fill: `${guides_1.appPalette.light.text} !important`,
        },
    },
    "dark-red": {},
    blue: {},
};
exports.progressStyles = progressStyles;
const genVolumeStyles = (sliderBg, processBg) => ({
    sliderContainer: {
        ...generalButtonStyles,
        background: sliderBg,
    },
    processLine: {
        background: processBg,
    },
});
const volumeStyles = {
    dark: {
        ...genVolumeStyles(guides_1.appPalette.darkPurple, guides_1.appPalette.dark.violetGradient),
    },
    light: {
        ...genVolumeStyles(guides_1.appPalette.light.main, guides_1.appPalette.light.lightGradient),
    },
    "dark-red": {
        ...genVolumeStyles(guides_1.appPalette.vinous.main, guides_1.appPalette.vinous.lightRedGradient),
    },
    blue: {
        ...genVolumeStyles(guides_1.appPalette.blue.main, guides_1.appPalette.blue.blueSkyGradient),
    },
};
exports.volumeStyles = volumeStyles;
const playlistGeneralStyles = {
    position: "absolute",
    width: "100%",
    padding: "40px 0",
    boxSizing: "border-box",
    left: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    ...mixins_1.mixins.neuMorphismShadow("inset 1px 2px 1px rgba(255, 255, 255, 0.06)", "inset -1px -2px 1px rgba(49, 48, 65, 0.25)"),
    [`@media${Grid_1.breakpoints.xs}`]: {
        padding: "40px 0 0 0",
    },
};
const TrackStyles = ({ color, bgColor, iconColor, shadow }) => ({
    "& .playlist__item": {
        fontSize: 16,
        lineHeight: 1.4,
        fontWeight: 400,
        background: bgColor,
        boxShadow: shadow.default,
        transition: "all .2s ease-in-out",
        "&-title, &-artist-name": {
            color,
        },
        "&:hover": {
            background: bgColor,
            cursor: "pointer",
            boxShadow: shadow.hover,
        },
        svg: {
            rect: {
                fill: iconColor.rectangle,
            },
            path: {
                fill: iconColor.path,
            },
        },
    },
});
const playlistStyles = {
    dark: {
        ...playlistGeneralStyles,
        background: guides_1.appPalette.darkPurple,
        ...TrackStyles({
            color: guides_1.appPalette.white,
            bgColor: guides_1.appPalette.darkPurple,
            iconColor: {
                rectangle: guides_1.appPalette.violet,
                path: guides_1.appPalette.white,
            },
            shadow: {
                default: "-4px -4px 8px rgba(255, 255, 255, 0.03), 4px 4px 8px rgba(0, 0, 0, 0.25)",
                hover: "-6px -6px 8px rgba(255, 255, 255, 0.03), 6px 6px 8px rgba(0, 0, 0, 0.25)",
            },
        }),
    },
    light: {
        ...playlistGeneralStyles,
        ".close-btn--cross svg": {
            fill: guides_1.appPalette.light.text,
        },
        background: guides_1.appPalette.white,
        ...TrackStyles({
            color: guides_1.appPalette.light.text,
            bgColor: guides_1.appPalette.light.lightGradient,
            iconColor: {
                rectangle: guides_1.appPalette.light.text,
                path: guides_1.appPalette.white,
            },
            shadow: { default: "", hover: "" },
        }),
    },
    "dark-red": {
        ...playlistGeneralStyles,
        background: guides_1.appPalette.vinous.main,
        ...TrackStyles({
            color: guides_1.appPalette.white,
            bgColor: guides_1.appPalette.redGradient,
            iconColor: {
                rectangle: guides_1.appPalette.vinous.main,
                path: guides_1.appPalette.white,
            },
            shadow: "",
        }),
    },
    blue: {
        ...playlistGeneralStyles,
        background: guides_1.appPalette.blue.main,
        ...TrackStyles({
            color: guides_1.appPalette.white,
            bgColor: guides_1.appPalette.blue.trackGradient,
            iconColor: {
                rectangle: guides_1.appPalette.blue.main,
                path: guides_1.appPalette.white,
            },
            shadow: {
                default: "1.5px 1.5px 3px #242E9B, -1px -1px 3px rgba(107, 96, 255, 0.25)",
                hover: " 3px 3px 3px #242E9B, -3px -3px 3px rgba(107, 96, 255, 0.25)",
            },
        }),
    },
};
exports.playlistStyles = playlistStyles;
//# sourceMappingURL=themes.js.map