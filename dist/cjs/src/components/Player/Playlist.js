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
const js_1 = require("@mdi/js");
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const __1 = require("..");
const css_1 = require("../../utils/css");
const guides_1 = require("../../utils/guides");
const themes_1 = require("./styles/themes");
const keyframes_1 = require("../../styles/jss/keyframes");
const scrollBarStyles = {
    bar: {
        width: 8,
    },
    track: {
        background: "transparent",
    },
    thumb: {
        border: "1px solid transparent",
        borderRadius: 4,
        background: guides_1.appPalette.white,
    },
};
const PlaylistContainer = styled_components_1.default.div({
    "@keyframes fadeIn": keyframes_1.keyFrames["@keyframes fadeIn"]("bottom", 140),
    paddingTop: 10,
    maxHeight: "600px",
    height: "100%",
    overflowY: "auto",
    paddingRight: 10,
    paddingLeft: 10,
    ...(0, css_1.scrollBarStyle)(scrollBarStyles),
});
const PlaylistWrapper = styled_components_1.default.div((props) => ({
    ...themes_1.playlistStyles[props.theme],
    animation: "fadeIn .2s",
    ul: {
        padding: 0,
    },
}));
const closeStyles = {
    svg: {
        fill: guides_1.appPalette.white,
    },
};
const Playlist = (props) => {
    const [bottom, setBottom] = (0, react_1.useState)("");
    const [movedTrackIndex, setMovedTrackIndex] = (0, react_1.useState)(null);
    const listRef = (0, react_1.useRef)(null);
    const listContainer = (0, react_1.useRef)(null);
    const onPlaybackChange = (0, react_1.useCallback)((value, id) => {
        props.playback(value, id);
    }, []);
    const onMove = (id) => {
        setMovedTrackIndex(id);
    };
    const items = props.items.map((item, i) => (react_1.default.createElement(__1.Track, { onShuffle: props.onShuffle, onRepeat: props.onRepeat, onMove: onMove, theme: props.theme, onPause: onPlaybackChange, index: i, onPlay: onPlaybackChange, item: item, key: item.id })));
    const onClosePlaylist = (0, react_1.useCallback)(() => props.onClose(false), []);
    (0, react_1.useEffect)(() => {
        const { height } = listRef.current.closest(".player").getBoundingClientRect();
        setBottom(`${height - 5}px`);
    }, []);
    const onDrop = (e) => {
        const item = e.target.closest(".playlist__item");
        props.onReorder({ moved: movedTrackIndex, target: +item.dataset.track });
    };
    return (react_1.default.createElement(PlaylistWrapper, { "data-testid": 'playlist', id: 'playlist', hidden: !props.show, theme: props.theme, bottom: bottom, className: 'playlist', ref: listRef, style: { bottom } },
        react_1.default.createElement("div", { className: 'container' },
            react_1.default.createElement(__1.Grid, null,
                react_1.default.createElement(__1.Column, { cols: { default: 12 } },
                    react_1.default.createElement(__1.Button, { id: 'closePlaylistBtn', styles: closeStyles, classes: ["close-btn--cross"], clickHandler: onClosePlaylist, view: 'fab', icon: { path: js_1.mdiClose, width: 30, height: 30, viewBox: "0 0 25 25", color: guides_1.appPalette.white }, color: 'transparent' }),
                    react_1.default.createElement(PlaylistContainer, { id: 'playlistContainer' },
                        react_1.default.createElement("ul", { onDrop: onDrop, ref: listContainer }, items)))))));
};
exports.default = Playlist;
//# sourceMappingURL=Playlist.js.map