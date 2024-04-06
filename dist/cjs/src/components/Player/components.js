"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = exports.Controls = exports.Volume = exports.Track = exports.TrackInfo = void 0;
const TrackInfo_1 = require("./TrackInfo");
Object.defineProperty(exports, "TrackInfo", { enumerable: true, get: function () { return TrackInfo_1.TrackInfo; } });
const Track_1 = require("./Track");
Object.defineProperty(exports, "Track", { enumerable: true, get: function () { return Track_1.Track; } });
const Volume_1 = require("./Volume");
Object.defineProperty(exports, "Volume", { enumerable: true, get: function () { return Volume_1.Volume; } });
const Controls_1 = require("./Controls");
Object.defineProperty(exports, "Controls", { enumerable: true, get: function () { return Controls_1.Controls; } });
const Progress_1 = __importDefault(require("./Progress"));
exports.Progress = Progress_1.default;
//# sourceMappingURL=components.js.map