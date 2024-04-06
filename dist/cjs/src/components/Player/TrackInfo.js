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
exports.TrackInfo = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const css_1 = require("../../utils/css");
const guides_1 = require("../../utils/guides");
const helpers_1 = require("../../utils/helpers");
const Grid_1 = require("../Grid");
const Grid_2 = require("../Grid/Grid");
const css_2 = require("../utils/css");
const TrackInfoSC = styled_components_1.default.div({
    color: guides_1.appPalette.white,
    ".time": {
        fontSize: 20,
    },
    ".track-info__cover": {
        width: 50,
        height: 50,
        ...(0, css_2.bgCoverSet)({ size: "100%" }),
    },
    ".track-info__name": {
        fontWeight: 500,
        ...css_1.truncateStringStyle,
        paddingRight: 20,
    },
    ".track-info__artist-name": {
        fontWeight: 300,
    },
    [`@media${Grid_2.breakpoints.xs}`]: {
        ".time": {
            fontSize: 16,
        },
        ".track-info__name, .track-info__artist-name": {
            fontSize: 14,
        },
        ".track-info__cover": {
            width: 40,
            height: 40,
        },
    },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let requestAnimationFrameId;
const imagesPath = process.env.NODE_ENV === "development" ? "src/assets/img/" : "";
const TrackInfo = (props) => {
    const [time, setTime] = (0, react_1.useState)("0:00");
    /**
     * The step called within requestAnimationFrame to update the playback position.
     */
    const step = function (context) {
        // Get the Howl we want to manipulate.
        const sound = context;
        // Determine our current seek position.
        const seek = sound.seek() || 0;
        setTime((0, helpers_1.formatTime)(Math.round(seek || 0)));
        requestAnimationFrame(step.bind(null, context));
    };
    (0, react_1.useEffect)(() => {
        if (props.track) {
            requestAnimationFrameId = requestAnimationFrame(step.bind(null, props.track));
        }
    }, [props.track]);
    (0, react_1.useEffect)(() => function cleanup() {
        requestAnimationFrameId = null;
    });
    return (react_1.default.createElement(TrackInfoSC, { "data-testid": 'track-info' },
        react_1.default.createElement("div", { className: 'track-info px-6 py-4 pl-xs-4 pr-xs-4' },
            react_1.default.createElement(Grid_1.Grid, null,
                react_1.default.createElement(Grid_1.Column, { cols: { default: 12 } },
                    react_1.default.createElement("div", { className: 'track-info d-flex' },
                        react_1.default.createElement("div", { className: 'track-info__cover mr-2', style: { backgroundImage: `url(${imagesPath + props.cover}` } }),
                        react_1.default.createElement("div", { className: 'd-flex flex-column' },
                            react_1.default.createElement("div", { "data-testid": 'track-name', className: 'track-info__name' }, props.title),
                            react_1.default.createElement("div", { "data-testid": 'track-artist-name', className: 'track-info__artist-name' }, props.artist)),
                        react_1.default.createElement("div", { className: 'time d-inline-block ml-auto' },
                            react_1.default.createElement("span", { id: 'timer' }, time),
                            react_1.default.createElement("span", { className: 'separator' }, " / "),
                            react_1.default.createElement("span", { id: 'duration' }, props.duration))))))));
};
exports.TrackInfo = TrackInfo;
//# sourceMappingURL=TrackInfo.js.map