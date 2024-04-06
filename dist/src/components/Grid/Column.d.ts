import React from "react";
import { Breakpoints } from "./types";
declare type TColumn = {
    cols: Breakpoints;
    align?: {
        vertical?: Breakpoints;
        horizontal?: Breakpoints;
    };
    offset?: Breakpoints;
    order?: Breakpoints;
    classes?: string;
    children?: any;
    style?: any;
};
declare const _default: React.NamedExoticComponent<TColumn>;
export default _default;
