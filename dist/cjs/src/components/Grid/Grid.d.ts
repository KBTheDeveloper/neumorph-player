import React from "react";
import { Breakpoints } from "./types";
declare type TGrid = {
    align?: {
        vertical?: Breakpoints;
        horizontal?: Breakpoints;
    };
    dir?: string;
    wrap?: string;
    children: any;
};
export declare const breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
export declare const gridOptions: {
    gutter: number;
};
declare const _default: React.NamedExoticComponent<TGrid>;
export default _default;
