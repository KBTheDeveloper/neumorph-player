import { CallbackType } from "../Player/types";

export type iconWrapperProps = {
  color?: string;
  iconName: string | null;
  icon?: unknown;
  styles?: Record<string, string>;
  sizes?: Record<string, string>;
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

export type iconProps = {
  iconName: string | null;
  color?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  noAlign?: boolean;
  icon?: unknown;
};
