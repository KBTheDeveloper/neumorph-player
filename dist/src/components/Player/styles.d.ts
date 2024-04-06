export declare const playerStyles: {
    [x: string]: ((prop: any, value: any) => {
        "0%": {
            [x: number]: number;
            opacity: number;
        };
        "100%": {
            [x: number]: any;
            opacity: number;
        };
    }) | ((prop: any, value: any) => {
        "0%": {
            [x: number]: any;
            opacity: number;
        };
        "50%": {
            [x: number]: any;
            opacity: number;
        };
        "100%": {
            [x: number]: number;
            opacity: number;
        };
    }) | {
        width: string;
        bottom?: undefined;
        left?: undefined;
        transition?: undefined;
        transitionTimingFunction?: undefined;
        "&.hidden"?: undefined;
        "&:hover"?: undefined;
        height?: undefined;
        ".player"?: undefined;
        minWidth?: undefined;
        writingMode?: undefined;
        "-webkit-appearance"?: undefined;
        borderRadius?: undefined;
        transform?: undefined;
        "&::-webkit-slider-thumb"?: undefined;
        "&::-ms-track"?: undefined;
        "&.toggled"?: undefined;
    } | {
        bottom: number;
        left: number;
        width: string;
        transition: string;
        transitionTimingFunction: string;
        "&.hidden": {
            "& [class*=playerCurtain]": {
                visibility: string;
                transform: string;
            };
            transform: string;
            transitionTimingFunction: string;
        };
        "&:hover": {
            "& > [class*=Player-playerCurtain]": {
                visibility: string;
                transform: string;
            };
        };
        height?: undefined;
        ".player"?: undefined;
        minWidth?: undefined;
        writingMode?: undefined;
        "-webkit-appearance"?: undefined;
        borderRadius?: undefined;
        transform?: undefined;
        "&::-webkit-slider-thumb"?: undefined;
        "&::-ms-track"?: undefined;
        "&.toggled"?: undefined;
    } | {
        cursor: string;
        "& [class*=iconWrapper]": {};
        background: string;
        boxShadow: string;
        position: string;
        display: string;
        visibility: string;
        justifyContent: string;
        left: string;
        transform: string;
        top: number;
        width: number;
        height: number;
        borderTopRightRadius: string;
        borderTopLeftRadius: string;
        transition: string;
        bottom?: undefined;
        transitionTimingFunction?: undefined;
        "&.hidden"?: undefined;
        "&:hover"?: undefined;
        ".player"?: undefined;
        minWidth?: undefined;
        writingMode?: undefined;
        "-webkit-appearance"?: undefined;
        borderRadius?: undefined;
        "&::-webkit-slider-thumb"?: undefined;
        "&::-ms-track"?: undefined;
        "&.toggled"?: undefined;
    } | {
        width: string;
        height: string;
        bottom?: undefined;
        left?: undefined;
        transition?: undefined;
        transitionTimingFunction?: undefined;
        "&.hidden"?: undefined;
        "&:hover"?: undefined;
        ".player"?: undefined;
        minWidth?: undefined;
        writingMode?: undefined;
        "-webkit-appearance"?: undefined;
        borderRadius?: undefined;
        transform?: undefined;
        "&::-webkit-slider-thumb"?: undefined;
        "&::-ms-track"?: undefined;
        "&.toggled"?: undefined;
    } | {
        ".player": {
            height: number;
        };
        width?: undefined;
        bottom?: undefined;
        left?: undefined;
        transition?: undefined;
        transitionTimingFunction?: undefined;
        "&.hidden"?: undefined;
        "&:hover"?: undefined;
        height?: undefined;
        minWidth?: undefined;
        writingMode?: undefined;
        "-webkit-appearance"?: undefined;
        borderRadius?: undefined;
        transform?: undefined;
        "&::-webkit-slider-thumb"?: undefined;
        "&::-ms-track"?: undefined;
        "&.toggled"?: undefined;
    } | {
        minWidth: number;
        writingMode: string;
        "-webkit-appearance": string;
        width: string;
        height: number;
        borderRadius: number;
        transform: string;
        "&::-webkit-slider-thumb": {
            width: number;
            height: number;
            "-webkit-appearance": string;
            appearance: string;
            border: string;
            borderRadius: string;
            backgroundColor: any;
            cursor: string;
            boxShadow: string;
        };
        "&::-ms-track": {
            width: string;
            cursor: string;
            background: string;
            borderColor: string;
            color: string;
        };
        bottom?: undefined;
        left?: undefined;
        transition?: undefined;
        transitionTimingFunction?: undefined;
        "&.hidden"?: undefined;
        "&:hover"?: undefined;
        ".player"?: undefined;
        "&.toggled"?: undefined;
    } | {
        "&.toggled": {
            boxShadow: string;
        };
        transition: string;
        width?: undefined;
        bottom?: undefined;
        left?: undefined;
        transitionTimingFunction?: undefined;
        "&.hidden"?: undefined;
        "&:hover"?: undefined;
        height?: undefined;
        ".player"?: undefined;
        minWidth?: undefined;
        writingMode?: undefined;
        "-webkit-appearance"?: undefined;
        borderRadius?: undefined;
        transform?: undefined;
        "&::-webkit-slider-thumb"?: undefined;
        "&::-ms-track"?: undefined;
    };
    "@keyframes fadeIn": (prop: any, value: any) => {
        "0%": {
            [x: number]: number;
            opacity: number;
        };
        "100%": {
            [x: number]: any;
            opacity: number;
        };
    };
    "@keyframes fadeOut": (prop: any, value: any) => {
        "0%": {
            [x: number]: any;
            opacity: number;
        };
        "50%": {
            [x: number]: any;
            opacity: number;
        };
        "100%": {
            [x: number]: number;
            opacity: number;
        };
    };
    ".controlsInner": {
        width: string;
    };
    "&.playerWrapper": {
        bottom: number;
        left: number;
        width: string;
        transition: string;
        transitionTimingFunction: string;
        "&.hidden": {
            "& [class*=playerCurtain]": {
                visibility: string;
                transform: string;
            };
            transform: string;
            transitionTimingFunction: string;
        };
        "&:hover": {
            "& > [class*=Player-playerCurtain]": {
                visibility: string;
                transform: string;
            };
        };
    };
    ".playerCurtain": {
        cursor: string;
        "& [class*=iconWrapper]": {};
        background: string;
        boxShadow: string;
        position: string;
        display: string;
        visibility: string;
        justifyContent: string;
        left: string;
        transform: string;
        top: number;
        width: number;
        height: number;
        borderTopRightRadius: string;
        borderTopLeftRadius: string;
        transition: string;
    };
    ".iconWrapper": {
        width: string;
        height: string;
    };
    ".volumeSlider": {
        minWidth: number;
        writingMode: string;
        "-webkit-appearance": string;
        width: string;
        height: number;
        borderRadius: number;
        transform: string;
        "&::-webkit-slider-thumb": {
            width: number;
            height: number;
            "-webkit-appearance": string;
            appearance: string;
            border: string;
            borderRadius: string;
            backgroundColor: any;
            cursor: string;
            boxShadow: string;
        };
        "&::-ms-track": {
            width: string;
            cursor: string;
            background: string;
            borderColor: string;
            color: string;
        };
    };
    ".sliderBtn": {
        "&.toggled": {
            boxShadow: string;
        };
        transition: string;
    };
};
