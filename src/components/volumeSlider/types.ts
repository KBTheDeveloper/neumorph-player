import { Sizes } from "@/components/types.d";
import { CallbackType } from "../Player/types";

export interface SliderProps {
  sizes: Sizes;
  min: number;
  max: number;
  // connect?: boolean,
  start: number;
  range?: unknown;
  orientation: "vertical" | "horizontal";
  children?: React.ReactFragment;
  view: string;
  color: string;
  value?: number;
  theme?: string;
  onChange?: CallbackType;
}
