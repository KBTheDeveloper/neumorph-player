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
const helpers_1 = require("../../utils/helpers");
const __1 = require("..");
const styled_components_1 = __importDefault(require("styled-components"));
const themes_1 = require("./styles/themes");
const ProgressSC = styled_components_1.default.div((props) => ({
    position: "absolute",
    left: 0,
    width: "100%",
    height: 10,
    cursor: "pointer",
    overflow: "hidden",
    ".progressLine": {
        ...themes_1.progressStyles[props.theme].progressLine,
        transition: "all .3s ease",
        transformOrigin: 0,
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 10,
    },
    ".bar": {
        background: "rgba(255,255,255,.3)",
        width: "100%",
        height: 10,
        boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.33)",
        opacity: 0.9,
    },
}));
let requestAnimationFrameId;
const step = function (context, element) {
    // Get the Howl we want to manipulate.
    // Determine our current seek position.
    // If the sound is still playing, continue stepping.
    const value = context?.seek ? (context.seek() / context.duration()) * 100 : 0;
    element.style.width = `${value}%`;
    requestAnimationFrameId = requestAnimationFrame(step.bind(null, context, element));
};
let trackIsMounted;
const Progress = (0, react_1.memo)((props) => {
    const progress = (0, react_1.useRef)(null);
    const lineRef = (0, react_1.useRef)(null);
    const sound = props.track.source.howl;
    const [tooltip, setTooltip] = (0, react_1.useState)({
        show: false,
        text: "",
        position: { x: 0, y: 0 },
    });
    const showTime = (per) => {
        // Convert the percent into a seek position.
        if (sound) {
            return (0, helpers_1.formatTime)(sound.duration() * per).replace(/\.\d+/, "");
        }
    };
    /**
     * Seek to a new position in the currently playing track.
     * @param  {Number} per Percentage through the song to skip.
     */
    const seek = (0, react_1.useCallback)(function (event) {
        if (!sound)
            return;
        const { x } = progress.current.getBoundingClientRect();
        const per = (event.clientX - x) / progress.current.offsetWidth;
        sound.seek(sound.duration() * per);
    }, [sound]);
    const onMouseMove = (0, react_1.useCallback)((event) => {
        if (!sound)
            return;
        const { x, y } = progress.current.getBoundingClientRect();
        setTooltip((state) => ({
            ...state,
            position: {
                y: tooltip.position.y === 0 ? y - 50 : tooltip.position.y,
                x: event.clientX < 0 ? 0 : event.clientX - 46 / 2,
            },
            text: showTime((event.clientX - Math.floor(x)) / progress.current.offsetWidth),
        }));
    }, [tooltip]);
    const onMouseOver = (0, react_1.useCallback)(() => {
        if (!sound)
            return;
        setTooltip((state) => ({ ...state, show: true }));
    }, [tooltip]);
    const onMouseOut = (0, react_1.useCallback)(() => {
        if (!trackIsMounted)
            return;
        setTooltip((state) => ({ ...state, show: false }));
    }, [tooltip]);
    (0, react_1.useEffect)(() => {
        requestAnimationFrameId = requestAnimationFrame(step.bind(null, sound, lineRef?.current));
        return function cleanup() {
            window.cancelAnimationFrame(requestAnimationFrameId);
        };
    });
    return (react_1.default.createElement(ProgressSC, { id: 'progress', "data-testid": 'progress', theme: props.theme, role: 'progressbar', className: 'progress mt-4', onClick: seek, onMouseOver: onMouseOver, onMouseOut: onMouseOut, onMouseMove: onMouseMove, ref: progress },
        react_1.default.createElement("div", { className: 'bar' }),
        react_1.default.createElement("svg", { width: progress.current?.offsetWidth, height: '10', id: 'progressLine', className: 'progressLine' },
            react_1.default.createElement("rect", { height: '10', ref: lineRef })),
        react_1.default.createElement("div", { id: 'tooltipWrapper' },
            react_1.default.createElement(__1.Tooltip, { theme: 'white', position: 'absolute', dir: 'bottom', show: tooltip.show, text: tooltip.text }))));
});
Progress.displayName = "Progress";
exports.default = Progress;
//# sourceMappingURL=Progress.js.map