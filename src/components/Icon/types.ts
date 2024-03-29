export type iconWrapperProps = {
  color?: string,
  iconName: string | null,
  icon?: any,
  styles?: any,
  sizes?: any,
  classes?: string,
  noAlign?: boolean,
  tabIndex?: string,
  title?: string,
  role?: string,
  children?: React.ReactFragment,
  disabled?: boolean,
  onClick?: Function,
  onKeyPress?: Function,
};

export type iconProps = {
  iconName: string | null,
  color?: string,
  width?: string,
  height?: string,
  viewBox?: string,
  noAlign?: boolean,
  icon?: any,
}