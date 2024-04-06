const mixins = {
    neuMorphGradient: (colors, important) => ({
        background: `linear-gradient(145deg, ${colors.first} 0%, ${colors.second} 100%)${important ? " !important" : ""}`,
    }),
    neuMorphGradientSC: (colors, important) => `background: linear-gradient(145deg, ${colors.first} 0%, ${colors.second} 100%)${important ? " !important" : ""}`,
    neuMorphismShadow: (positive = "4px 4px 8px #111315", negative = "-4px -4px 8px #3339") => ({
        boxShadow: `${positive}, ${negative}`,
    }),
    neuMorphismShadowSC: (positive = "4px 4px 8px #111315", negative = "-4px -4px 8px #3339") => `box-shadow: ${positive}, ${negative}`,
    shadow: () => ({ boxShadow: "1px 0px 7px 1px rgba(0, 0, 0, 0.2)" }),
};
export { mixins };
//# sourceMappingURL=mixins.js.map