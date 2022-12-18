import React, { useState, useEffect, useRef } from "react";
import { appPalette } from "../../utils/guides";
import { iconsList } from "./IconsList";
import { iconProps } from "./types";

export const Icon: React.FunctionComponent<iconProps> = (props: iconProps) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const defaultViewBox = "0 0 25 25";
  const defaultColor = props.color || "white";
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);
  const getBoxCenter = () => {
    const vb = (props.viewBox || defaultViewBox).split(" ");
    const sizes = pathRef.current ? pathRef.current?.getBBox() : null;
    if(sizes) {
      const y = (((+vb[3]) - sizes.height) / 2 ) - sizes.y;
      const x = (((+vb[2]) - sizes.width) / 2 ) - sizes.x;
      setX(x < 0 ? 0 : x);
      setY(y);
    }
  };
  useEffect(() => { getBoxCenter() });

  const icon = props.iconName ? iconsList[props.iconName] : props.icon;
  const sizes = {width: props.width || 25, height: props.height || 25, viewBox: props.viewBox || defaultViewBox};
  const noAlign = !props.noAlign && {transform: `translate(${x}, ${y})`};
  const svg = props.iconName ?
    <svg width={sizes.width} height={sizes.height} fill={appPalette[defaultColor]} viewBox={sizes.viewBox}>
      <path {...noAlign} ref={pathRef} d={icon} />
    </svg> :
    <svg width={sizes.width} height={sizes.height} fill={props.icon.color} viewBox={props.viewBox}>
      <path {...noAlign} ref={pathRef} d={props.icon.d} />
  </svg>;
  return (
    <React.Fragment>
      {svg}
    </React.Fragment>
  );
}