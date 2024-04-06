/// <reference types="react" />
import { CallbackType } from "../Player/types";
export declare type iconWrapperProps = {
    color?: string;
    iconName: string | null;
    icon?: any;
    styles?: any;
    sizes?: any;
    classes?: string;
    noAlign?: boolean;
    tabIndex?: string;
    title?: string;
    role?: string;
    children?: React.ReactFragment;
    disabled?: boolean;
    onClick?: CallbackType;
    onKeyPress?: CallbackType;
};
export declare type iconProps = {
    iconName: string | null;
    color?: string;
    width?: string;
    height?: string;
    viewBox?: string;
    noAlign?: boolean;
    icon?: any;
};
