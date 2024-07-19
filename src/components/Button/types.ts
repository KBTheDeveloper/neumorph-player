import { MouseEventHandler, ReactNode } from "react";
type Icon = {
  width: string;
  height: string;
  path: string;
  viewBox: string;
};

export type ButtonProps = {
  id?: string;
  icon?: Icon;
  color?: string;
  text?: string;
  type?: string;
  classes?: string[];
  view?: string;
  href?: string | boolean;
  visibility?: boolean;
  disabled?: boolean;
  styles?: unknown;
  tabIndex?: string;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};
