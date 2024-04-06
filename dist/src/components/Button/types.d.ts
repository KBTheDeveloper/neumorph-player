import { MouseEventHandler } from "react";
export declare type ButtonProps = {
    id?: string;
    icon?: any;
    color?: string;
    text?: string;
    type?: string;
    classes?: any;
    view?: string;
    href?: string | boolean;
    visibility?: boolean;
    disabled?: boolean;
    styles?: any;
    tabIndex?: string;
    clickHandler?: MouseEventHandler<HTMLButtonElement>;
    children?: any;
};
