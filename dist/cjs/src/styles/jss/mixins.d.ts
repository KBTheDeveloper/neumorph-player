declare const mixins: {
    neuMorphGradient: (colors: any, important?: boolean) => {
        background: string;
    };
    neuMorphGradientSC: (colors: any, important?: boolean) => string;
    neuMorphismShadow: (positive?: string, negative?: string) => {
        boxShadow: string;
    };
    neuMorphismShadowSC: (positive?: string, negative?: string) => string;
    shadow: () => {
        boxShadow: string;
    };
};
export { mixins };
