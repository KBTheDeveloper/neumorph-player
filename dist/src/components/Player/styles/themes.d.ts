declare const playerStyles: {
    dark: {
        boxShadow: string;
        backgroundColor: any;
        width: string;
        height: number;
        position: string;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
    };
    light: {
        background: any;
        ".track-info__name, .track-info__artist-name, .time": {
            color: string;
        };
        boxShadow: string;
        width: string;
        height: number;
        position: string;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
    };
    "dark-red": {
        backgroundColor: any;
        boxShadow: string;
        width: string;
        height: number;
        position: string;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
    };
    blue: {
        backgroundColor: any;
        boxShadow: string;
        width: string;
        height: number;
        position: string;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
    };
};
declare const buttonStyles: {
    dark: any;
    light: any;
    blue: any;
};
declare const progressStyles: {
    dark: {
        progressLine: {
            fill: string;
        };
    };
    light: {
        progressLine: {
            fill: string;
        };
    };
    "dark-red": {};
    blue: {};
};
declare const volumeStyles: {
    dark: {
        sliderContainer: {
            background: any;
            boxShadow: string;
        };
        processLine: {
            background: any;
        };
    };
    light: {
        sliderContainer: {
            background: any;
            boxShadow: string;
        };
        processLine: {
            background: any;
        };
    };
    "dark-red": {
        sliderContainer: {
            background: any;
            boxShadow: string;
        };
        processLine: {
            background: any;
        };
    };
    blue: {
        sliderContainer: {
            background: any;
            boxShadow: string;
        };
        processLine: {
            background: any;
        };
    };
};
declare const playlistStyles: {
    dark: {
        "& .playlist__item": {
            fontSize: number;
            lineHeight: number;
            fontWeight: number;
            background: any;
            boxShadow: any;
            transition: string;
            "&-title, &-artist-name": {
                color: any;
            };
            "&:hover": {
                background: any;
                cursor: string;
                boxShadow: any;
            };
            svg: {
                rect: {
                    fill: any;
                };
                path: {
                    fill: any;
                };
            };
        };
        background: any;
        boxShadow: string;
        position: string;
        width: string;
        padding: string;
        boxSizing: string;
        left: number;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
    };
    light: {
        "& .playlist__item": {
            fontSize: number;
            lineHeight: number;
            fontWeight: number;
            background: any;
            boxShadow: any;
            transition: string;
            "&-title, &-artist-name": {
                color: any;
            };
            "&:hover": {
                background: any;
                cursor: string;
                boxShadow: any;
            };
            svg: {
                rect: {
                    fill: any;
                };
                path: {
                    fill: any;
                };
            };
        };
        ".close-btn--cross svg": {
            fill: any;
        };
        background: any;
        boxShadow: string;
        position: string;
        width: string;
        padding: string;
        boxSizing: string;
        left: number;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
    };
    "dark-red": {
        "& .playlist__item": {
            fontSize: number;
            lineHeight: number;
            fontWeight: number;
            background: any;
            boxShadow: any;
            transition: string;
            "&-title, &-artist-name": {
                color: any;
            };
            "&:hover": {
                background: any;
                cursor: string;
                boxShadow: any;
            };
            svg: {
                rect: {
                    fill: any;
                };
                path: {
                    fill: any;
                };
            };
        };
        background: any;
        boxShadow: string;
        position: string;
        width: string;
        padding: string;
        boxSizing: string;
        left: number;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
    };
    blue: {
        "& .playlist__item": {
            fontSize: number;
            lineHeight: number;
            fontWeight: number;
            background: any;
            boxShadow: any;
            transition: string;
            "&-title, &-artist-name": {
                color: any;
            };
            "&:hover": {
                background: any;
                cursor: string;
                boxShadow: any;
            };
            svg: {
                rect: {
                    fill: any;
                };
                path: {
                    fill: any;
                };
            };
        };
        background: any;
        boxShadow: string;
        position: string;
        width: string;
        padding: string;
        boxSizing: string;
        left: number;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
    };
};
export { buttonStyles, progressStyles, playerStyles, volumeStyles, playlistStyles };
