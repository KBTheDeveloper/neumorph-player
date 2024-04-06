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
exports.Volume = void 0;
const react_1 = __importStar(require("react"));
const volumeSlider_1 = __importDefault(require("../volumeSlider"));
const styled_components_1 = __importDefault(require("styled-components"));
const themes_1 = require("./styles/themes");
const keyframes_1 = require("../../styles/jss/keyframes");
const IconWrapper_1 = require("../Icon/IconWrapper");
const VolumeSC = styled_components_1.default.button((props) => ({
    "@keyframes fadeInVolume": keyframes_1.keyFrames["@keyframes fadeIn"]("bottom", 60),
    "@keyframes fadeoutVolume": keyframes_1.keyFrames["@keyframes fadeOut"]("bottom", 60),
    "&.volumeBtn": {
        width: 40,
        height: 40,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        ...themes_1.buttonStyles[props.theme].defaultButton,
        borderRadius: "50%",
        cursor: "pointer",
        "&:before": {
            content: '""',
            height: 80,
            width: "100%",
            display: "none",
            position: "absolute",
            bottom: 0,
            left: 0,
        },
        "&.hidden": {
            "& .volume": {
                animation: "fadeoutVolume ease .4s",
            },
        },
        "&.visible": {
            "& .volume": {
                animation: "fadeInVolume ease .4s",
                opacity: 1,
                bottom: 60,
            },
            "&:before": {
                display: "block",
            },
        },
        "& svg": {
            cursor: "pointer",
        },
    },
    ".volume": {
        borderRadius: 5,
        width: 40,
        height: 250,
        transform: "translateX(-50%)",
        position: "absolute",
        bottom: -500,
        left: "50%",
        ...themes_1.volumeStyles[props.theme].sliderContainer,
        touchAction: "none",
        "-webkit-user-select": "none",
        "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        opacity: 0,
        zIndex: 20,
    },
    ".volume--muted": {
        filter: "grayscale(1)",
        cursor: "not-allowed",
        "& .range-slider": {
            pointerEvents: "none",
        },
    },
}));
exports.Volume = react_1.default.memo((props) => {
    const volumeRef = react_1.default.useRef(null);
    const volumeBtnRef = react_1.default.useRef(null);
    const [slider, setSlider] = react_1.default.useState(false);
    const [icon, setIcon] = react_1.default.useState("volumeHigh");
    const [isMouseDown, setIsMouseDown] = react_1.default.useState(false);
    const [mute, setMute] = react_1.default.useState(false);
    const showSlider = () => {
        volumeBtnRef.current.classList.remove("hidden");
        volumeBtnRef.current.classList.add("visible");
    };
    const hideSlider = () => {
        volumeBtnRef.current.classList.remove("visible");
        volumeBtnRef.current.classList.add("hidden");
    };
    const onMouseOut = (0, react_1.useCallback)((e) => {
        const { relatedTarget } = e;
        const target = e.target.closest(".volume");
        if ((!target || (!target.contains(relatedTarget) && !isMouseDown)) && e.pointerType === "mouse") {
            hideSlider();
        }
    }, []);
    const onPointerOver = (0, react_1.useCallback)(() => {
        setSlider(true);
        showSlider();
    }, []);
    const toggleSlider = (0, react_1.useCallback)(() => {
        if (volumeBtnRef.current.classList.contains(".visible")) {
            hideSlider();
        }
        else {
            showSlider();
        }
        setSlider(!slider);
    }, [slider]);
    const onVolumeChange = (0, react_1.useCallback)((value) => {
        if (!mute) {
            window.localStorage.setItem("player_settings", JSON.stringify({ settings: { volume: value } }));
        }
        const icon = value > 50 ? "volumeHigh" : value === 0 ? "mute" : "volumeMedium";
        setIcon(icon);
        window.Howler.volume(value / 100);
    }, [mute]);
    const onVolumeClick = (0, react_1.useCallback)((event) => {
        const found = event.target.classList.contains("volumeBtn");
        if (found && event.pointerType === "mouse") {
            if (window.Howler._muted) {
                window.Howler.mute(false);
                setMute(false);
            }
            else {
                window.Howler.mute(true);
                setMute(true);
            }
        }
    }, []);
    const getVolume = () => {
        const volume = window.localStorage.getItem("player_settings")
            ? JSON.parse(window.localStorage.getItem("player_settings"))?.settings?.volume / 100
            : props.level / 100;
        return mute ? 0 : volume;
    };
    react_1.default.useEffect(() => {
        const fader = volumeRef.current.querySelector(".range-slider__thumb");
        window.Howler.volume(getVolume());
        const onMouseDown = () => {
            setIsMouseDown(true);
            document.addEventListener("pointerup", onMouseUp);
            function onMouseUp(e) {
                setIsMouseDown(false);
                const faderEl = e.target.closest(".range-slider__base");
                if (!faderEl) {
                    setSlider(false);
                    hideSlider();
                }
                document.removeEventListener("pointerup", onMouseUp);
            }
        };
        fader.addEventListener("pointerdown", onMouseDown);
        return function cleanup() {
            fader.removeEventListener("pointerdown", onMouseDown);
        };
    }, []);
    const muted = mute ? "volume--muted" : "";
    return (react_1.default.createElement(VolumeSC, { "data-testid": 'volume', theme: props.theme, ref: volumeBtnRef, className: `volumeBtn btn btn--volume ml-auto`, onPointerOver: onPointerOver, onPointerDown: onVolumeClick, onKeyPress: toggleSlider, onPointerEnter: onPointerOver, onPointerOut: onMouseOut },
        react_1.default.createElement("div", { id: 'volume', ref: volumeRef, className: `volume fadeout d-flex justify-center align-items--center${muted} py-5` },
            react_1.default.createElement(volumeSlider_1.default, { theme: props.theme, view: 'round-vertical', color: 'orange', orientation: 'vertical', onChange: onVolumeChange, sizes: { width: 10 }, start: getVolume(), min: 0, max: 100 })),
        react_1.default.createElement(IconWrapper_1.IconWrapper, { title: 'Volume', sizes: {
                width: 25,
                height: 25,
                viewBox: "0 0 25 25",
            }, noAlign: true, iconName: mute ? "mute" : icon })));
});
exports.Volume.displayName = "Volume";
//# sourceMappingURL=Volume.js.map