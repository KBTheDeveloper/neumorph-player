export const truncateStringStyle = {
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
};
export const scrollBarStyle = (styles) => ({
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
//# sourceMappingURL=css.js.map