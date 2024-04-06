"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyFrames = void 0;
const mixins_1 = require("./mixins");
exports.keyFrames = {
    "@keyframes fadeIn": (prop, value) => ({
        "0%": { opacity: 0, [prop]: -10 },
        "100%": { opacity: 1, [prop]: value },
    }),
    "@keyframes fadeOut": (prop, value) => ({
        "0%": { opacity: 1, [prop]: value },
        "50%": { opacity: 1, [prop]: value },
        "100%": { opacity: 0, [prop]: -10 },
        //"100%": {display: "none"}
    }),
    "@keyframes buttonBackground": {
        from: { ...mixins_1.mixins.neuMorphGradient({ first: "#4C155D", second: "#2A1433" }) },
        to: { ...mixins_1.mixins.neuMorphGradient({ first: "#2A1433", second: "#4C155D" }) },
    },
};
//# sourceMappingURL=keyframes.js.map