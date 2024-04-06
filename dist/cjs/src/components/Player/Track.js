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
exports.Track = void 0;
const js_1 = require("@mdi/js");
const react_1 = __importStar(require("react"));
const guides_1 = require("../../utils/guides");
const components_1 = require("../../components");
const styled_components_1 = __importDefault(require("styled-components"));
const themes_1 = require("./styles/themes");
const TrackSC = styled_components_1.default.li.attrs(() => ({
    draggable: true,
})) `
&button {
  border: none;
  padding: 10px 5.5rem;
  font-size: 1.4em;
  cursor: pointer;
  &.visible {
    display: block;
  }
}
.close-btn--cross {
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 10px;
}
&.playlist__item {
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  z-index: 5;
  position: relative;
  &:hover {
    & button {
      display: flex;
    }
  }
  &.dragging {
    box-shadow: -3px -3px 1px 0px rgba(186, 118, 255, 0.40), 0.5px 0.5px 5px 0px rgba(186, 118, 255, 0.40)!important;
  }
  &.selected {
    opacity: 1;
    border: 2px solid ${guides_1.appPalette.lightPurple};
  }
  & button {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.playlist__item-cover {
  width: 50px;
  height: 50px;
  position: relative;
  background-size: 100%;
  background-repeat: no-repeat;
}
&.playlist__item--is-playing {
  & .visualizer {
    display: "flex";
  }
}
.playlist__item-info {
  line-height: 1.4;
  color: ${guides_1.appPalette.white};
}
.playlist__item-title {
  font-weight: 500;
}
.playlist__item-artist-name {
  color: #b5b5b5;
  cursor: pointer;
}
.fab {
  border-radius: 3px !important;
  display: flex;
  border-radius: 0;
}
.button--orange {
  background-color: ${guides_1.appPalette.orange};
  color: ${guides_1.appPalette.white};
}
.button--transparent {
  background-color: transparent;
} 
}`;
const Track = (props) => {
    const [play, setPlay] = (0, react_1.useState)(false);
    const onPlay = (0, react_1.useCallback)(() => {
        props.onPlay(true, props.item.id);
        setPlay(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [play]);
    const onPause = (0, react_1.useCallback)(() => {
        props.onPause(false, props.item.id);
        setPlay(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [play]);
    (0, react_1.useEffect)(() => {
        if (play && props.item.howl && props.item.howl._sounds[0]._paused) {
            setPlay(false);
        }
    }, [play, props.item.howl]);
    const onDragStart = (e) => {
        const item = e.target.closest(".playlist__item");
        item.classList.add("dragging");
        props.onMove(+item.dataset.track);
    };
    const onDragOver = (e) => {
        e.preventDefault();
    };
    const onDragEnd = (e) => {
        const draggingItem = e.target.closest(".playlist__item.dragging");
        draggingItem.classList.remove("dragging");
    };
    const pauseBtn = (react_1.default.createElement(components_1.Button, { tabIndex: '0', view: 'fab--small', styles: { ...themes_1.buttonStyles[props.theme].defaultButton }, clickHandler: onPause, icon: { path: js_1.mdiPause, width: 30, height: 30, viewBox: "0 0 25 25", color: guides_1.appPalette.white } }));
    const playBtn = (react_1.default.createElement(components_1.Button, { tabIndex: '0', view: 'fab--small', styles: { ...themes_1.buttonStyles[props.theme].defaultButton }, clickHandler: onPlay, icon: { path: js_1.mdiPlay, width: 30, height: 30, viewBox: "0 0 25 25", color: guides_1.appPalette.white } }));
    const isPlay = play || (props.item.howl && !props.item.howl._sounds[0]._paused) ? pauseBtn : playBtn;
    return (react_1.default.createElement(TrackSC, { "data-testid": 'track', tabIndex: '0', className: `playlist__item d-flex align-items--center pa-3 ${play ? "playlist__item--is-playing" : ""}`, onDragOver: onDragOver, onDragStart: onDragStart, onDragEnd: onDragEnd, "data-track": `${props.item.id}`, key: props.item.title },
        react_1.default.createElement("div", { className: 'playlist__item-cover mr-2', style: { backgroundImage: `url('src/assets/img/${props.item.cover}')` } }, isPlay),
        react_1.default.createElement("div", { className: 'playlist__item-info' },
            react_1.default.createElement("div", { className: 'playlist__item-title' }, props.item.title),
            react_1.default.createElement("span", { className: 'playlist__item-artist-name flex-grow-1' }, props.item.artist))));
};
exports.Track = Track;
//# sourceMappingURL=Track.js.map