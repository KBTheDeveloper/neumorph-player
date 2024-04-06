"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bgCoverSet = void 0;
const bgCoverSet = ({ size, repeat = "no-repeat", position = "center" }) => ({
    backgroundSize: size,
    backgroundRepeat: repeat ? "repeat" : "no-repeat",
    backgroundPosition: position,
});
exports.bgCoverSet = bgCoverSet;
//# sourceMappingURL=css.js.map