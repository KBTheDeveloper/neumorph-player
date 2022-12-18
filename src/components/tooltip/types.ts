export interface TooltipProps {
  text: any;
  theme: any;
  position?: any,
  dir: string,
  type?: "static" | "dynamic";
  show: boolean,
  children?: React.ReactFragment;
}