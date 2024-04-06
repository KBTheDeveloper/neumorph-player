/// <reference types="react" />
import { CallbackType } from "../Player/types";
export interface SliderProps {
    sizes: any;
    min: number;
    max: number;
    start: number;
    range?: any;
    orientation: "vertical" | "horizontal";
    children?: React.ReactFragment;
    view: string;
    color: string;
    value?: number;
    theme?: string;
    onChange?: CallbackType;
}
