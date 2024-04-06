"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollBarStyle = exports.truncateStringStyle = void 0;
exports.truncateStringStyle = {
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
};
const scrollBarStyle = (styles) => ({
    "&::-webkit-scrollbar": {
        width: styles.bar.width,
    },
    "&::-webkit-scrollbar-track": {
        background: styles.track.background,
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: styles.thumb.background,
        borderRadius: styles.thumb.borderRadius,
        border: styles.thumb.border,
    },
});
exports.scrollBarStyle = scrollBarStyle;
//# sourceMappingURL=css.js.map