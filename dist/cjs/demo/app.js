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
exports.App = void 0;
const react_hot_loader_1 = require("react-hot-loader");
const react_1 = __importStar(require("react"));
const helpers_1 = require("../src/utils/helpers");
const Player = (0, helpers_1.lazy)(() => Promise.resolve().then(() => __importStar(require("../src/components/Player/Player"))));
const App = () => {
    const tracks = [
        {
            title: "Demo Song 1",
            artist: "Chronoks",
            filename: "Chronoks - demo song 1.mp3",
            id: 1,
            howl: null,
            cover: "demo_song_placeholder_1.png",
            video: "src/assets/video/100_0001.mov",
        },
        {
            title: "Demo Song 2",
            artist: "Chronoks",
            filename: "Chronoks - demo song 2.mp3",
            id: 2,
            howl: null,
            cover: "demo_song_placeholder_2.png",
        },
        {
            title: "Demo Song 3",
            filename: "Chronoks - demo song 3.mp3",
            artist: "Unknown Artist",
            id: 3,
            howl: null,
            cover: "demo_song_placeholder_3.png",
        },
    ];
    const player = tracks.length > 0 ? react_1.default.createElement(Player, { tracks: tracks, theme: 'dark' }) : null;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("main", { className: 'main' },
            react_1.default.createElement("div", { className: 'container' },
                react_1.default.createElement(react_1.Suspense, { fallback: "loading" }, player)))));
};
exports.App = App;
exports.default = (0, react_hot_loader_1.hot)(module)(exports.App);
//# sourceMappingURL=app.js.map