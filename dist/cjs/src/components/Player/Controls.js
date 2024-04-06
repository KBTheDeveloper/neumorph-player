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
exports.Controls = void 0;
const react_1 = __importStar(require("react"));
const __1 = require("..");
const themes_1 = require("./styles/themes");
const guides_1 = require("../../utils/guides");
const browser_1 = require("../../utils/browser");
const Controls = (props) => {
    const currentTrack = props.items.find((track) => track.howl) || props.items[0];
    const videoPlayerRef = react_1.default.useRef(null);
    const setVideoCurrentTime = () => (videoPlayerRef.current.currentTime = currentTrack.howl.seek());
    const [shuffle, setShuffle] = (0, react_1.useState)(JSON.parse(localStorage.getItem("settings"))?.shuffle || false);
    const [repeat, setRepeat] = (0, react_1.useState)("off");
    const onPlay = (id) => {
        props.onPlay(true, id);
        if (videoPlayerRef.current) {
            videoPlayerRef.current.play();
            setVideoCurrentTime();
        }
    };
    const onPause = (id) => {
        props.onPause(false, id);
        if (videoPlayerRef.current) {
            videoPlayerRef.current.pause();
            setVideoCurrentTime();
        }
    };
    const seekTypes = {
        fw: (howl) => howl.seek(howl.seek() + 10),
        rew: (howl) => howl.seek(howl.seek() - 10),
    };
    const seek = (type) => {
        const { howl } = props.items.find((track) => track.howl);
        if (!howl)
            return;
        seekTypes[type](howl);
        if (videoPlayerRef) {
            setVideoCurrentTime();
        }
    };
    const onPrev = () => {
        props.onSkip("prev");
        if (videoPlayerRef.current) {
            videoPlayerRef.current.play();
            setVideoCurrentTime();
        }
    };
    const onNext = () => {
        props.onSkip("next");
        if (videoPlayerRef.current) {
            videoPlayerRef.current.play();
            setVideoCurrentTime();
        }
    };
    const togglePlay = () => {
        if (currentTrack?.howl && !currentTrack?.howl._sounds[0]._paused) {
            onPause(currentTrack?.id);
        }
        else {
            onPlay(currentTrack?.id || 1);
        }
    };
    const keys = {
        ArrowRight: () => seek("fw"),
        ArrowLeft: () => seek("rew"),
        Space: () => {
            togglePlay();
        },
        Enter: (event) => {
            const playButton = event.target.closest(".btn--play") || event.target?.closest(".btn--pause]");
            if (!playButton)
                return;
            if (playButton.classList.contain("btn---pause"))
                playButton.focus();
            togglePlay();
        },
    };
    const onKeyDown = (event) => {
        if (event.code in keys) {
            keys[event.code](event);
        }
    };
    const onShuffle = () => {
        setShuffle(!shuffle);
        props.onShuffle();
    };
    const onRepeat = () => {
        if (repeat === "off")
            setRepeat("on");
        else if (repeat === "on")
            setRepeat("once");
        else
            setRepeat("off");
    };
    (0, react_1.useEffect)(() => {
        document.addEventListener("keydown", onKeyDown);
        return function cleanup() {
            document.removeEventListener("keydown", onKeyDown);
        };
    });
    (0, react_1.useEffect)(() => props.onRepeat(repeat), [repeat]);
    const playButtonStyle = {
        ...themes_1.buttonStyles[props.theme].playButton,
    };
    const defaultButtonStyle = {
        ...themes_1.buttonStyles[props.theme].defaultButton,
    };
    const shuffleButtonStyle = {
        ...themes_1.buttonStyles[props.theme].defaultButton,
        ...(shuffle && { background: `linear-gradient(145deg, ${guides_1.appPalette.violet2} 0%, ${guides_1.appPalette.violet} 100%)` }),
    };
    const repeatButtonStyle = {
        ...themes_1.buttonStyles[props.theme].defaultButton,
        ...((repeat === "on" || repeat === "once") && {
            background: `linear-gradient(145deg, ${guides_1.appPalette.violet2} 0%, ${guides_1.appPalette.violet} 100%)`,
        }),
    };
    const buttons = props.playback === "play" ? (react_1.default.createElement(__1.IconWrapper, { "data-testid": 'pause-btn', role: 'button', title: 'Pause', tabIndex: '0', noAlign: true, styles: playButtonStyle, classes: 'btn--pause mr-5', iconName: 'pause', onClick: togglePlay, onKeyPress: togglePlay })) : (react_1.default.createElement(__1.IconWrapper, { title: 'Play', role: 'button', tabIndex: '0', styles: playButtonStyle, noAlign: true, classes: 'btn--play mr-5', iconName: 'play', onClick: togglePlay, onKeyPress: togglePlay }));
    return (react_1.default.createElement("div", { "data-testid": 'controls', className: 'controls d-flex align-items--center' },
        !(0, browser_1.isMobile)() && (react_1.default.createElement(__1.IconWrapper, { noAlign: true, title: 'Previous track', role: 'button', tabIndex: '0', styles: defaultButtonStyle, classes: 'mr-5', iconName: 'prev', onClick: onPrev, onKeyPress: onPrev })),
        react_1.default.createElement("div", { id: 'loading', style: { display: props.loading ? "block" : "none" }, className: 'mr-5' }),
        buttons,
        !(0, browser_1.isMobile)() && (react_1.default.createElement(__1.IconWrapper, { title: 'Next track', role: 'button', noAlign: true, tabIndex: '0', classes: 'mr-5', styles: defaultButtonStyle, iconName: 'next', onClick: onNext, onKeyPress: onNext })),
        !(0, browser_1.isMobile)() && (react_1.default.createElement(__1.IconWrapper, { title: 'Shuffle tracks', role: 'button', noAlign: true, tabIndex: '0', classes: 'mr-5', styles: shuffleButtonStyle, iconName: 'shuffle', onClick: onShuffle })),
        !(0, browser_1.isMobile)() && (react_1.default.createElement(__1.IconWrapper, { title: 'Repeat', role: 'button', noAlign: true, tabIndex: '0', classes: 'mr-5', styles: repeatButtonStyle, iconName: repeat === "once" ? "repeatOnce" : "repeat", onClick: onRepeat })),
        props.videoPlayer));
};
exports.Controls = Controls;
//# sourceMappingURL=Controls.js.map