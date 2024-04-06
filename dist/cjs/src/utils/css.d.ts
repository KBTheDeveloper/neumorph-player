export declare const truncateStringStyle: {
    flex: number;
    whiteSpace: string;
    overflow: string;
    textOverflow: string;
};
export declare type ScrollStyleType = {
    bar: {
        width: string | number;
    };
    track: {
        background: string;
    };
    thumb: {
        background: string;
        borderRadius: number;
        border: string;
    };
};
export declare const scrollBarStyle: (styles: ScrollStyleType) => {
    "&::-webkit-scrollbar": {
        width: string | number;
    };
    "&::-webkit-scrollbar-track": {
        background: string;
    };
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: string;
        borderRadius: number;
        border: string;
    };
};
