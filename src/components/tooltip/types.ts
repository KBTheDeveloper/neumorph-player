export interface TooltipProps {
  text: unknown;
  theme: unknown;
  position?: unknown;
  dir: string;
  type?: "static" | "dynamic";
  show: boolean;
  children?: React.ReactFragment;
}
