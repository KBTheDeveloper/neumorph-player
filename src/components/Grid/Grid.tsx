import React, { memo, ReactNode } from "react";
import styled from "styled-components";
import { Breakpoints } from "./types";

type TGrid = {
  align?: {
    vertical?: Breakpoints;
    horizontal?: Breakpoints;
  };
  dir?: string;
  wrap?: string;
  children: ReactNode;
};
const aligns = {
  horizontal: {
    start: "start",
    end: "end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
    stretch: "stretch",
    unset: "unset",
  },
  vertical: {
    start: "start",
    end: "end",
    center: "center",
    "flex-start": "flex-start",
    "flex-end": "flex-end",
    stretch: "stretch",
    unset: "unset",
  },
};

export const breakpoints = {
  xs: "(max-width: 576px)",
  sm: "(min-width: 576px) and (max-width: 767.98px)",
  md: "(min-width: 768px) and (max-width: 1199.98px)",
  lg: "(min-width: 1200px) and (max-width: 1399.98px)",
  xl: "(min-width: 1400px)",
};
const createAlignObject = (props: unknown, axis: string) => {
  const alignObject = { xl: "unset" };
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      alignObject[key] = aligns[axis][value] || aligns[axis].unset;
    });
  }
  return alignObject;
};
const createMediaQueries = (props, propName) => {
  return typeof props === "object"
    ? Object.entries(props)
        .map(([key, value]: [string, string]) => {
          if (value !== "unset")
            return `@media${breakpoints[key]}{\n ${propName}: ${aligns.horizontal[value]}; \n}; \n`;
        })
        .join("")
    : "";
};
export const gridOptions = { gutter: 15 };
const GridSC = styled.div((props) => {
  const defaultAligns = {
    vertical: createAlignObject(props.align.vertical, "vertical"),
    horizontal: createAlignObject(props.align.horizontal, "horizontal"),
  };
  const defaultDir = props.dir || "row";
  const defaultWrap = props.dir || "wrap";
  const alignHorMQueries = createMediaQueries(defaultAligns.horizontal, "justify-content") || "";
  const alignVertMQueries = createMediaQueries(defaultAligns.vertical, "align-items") || "";
  return `
  display: flex;
  flex-flow: ${defaultDir} ${defaultWrap};
  justify-content: ${defaultAligns.horizontal.xl};
  align-items: ${defaultAligns.vertical.xl};
  margin-left: ${-gridOptions.gutter}px;
  margin-right: ${-gridOptions.gutter}px;
  ${alignHorMQueries}
  ${alignVertMQueries}`;
});

const Grid: React.FunctionComponent<TGrid> = (props: TGrid) => {
  const classes = "grid";
  const horizontal = props.align?.horizontal || { xl: "offset" };
  const vertical = props.align?.vertical || { xl: "offset" };
  return (
    <GridSC
      align={{
        horizontal,
        vertical,
      }}
      dir={props.dir}
      wrap={props.wrap}
      className={classes}
    >
      {props.children}
    </GridSC>
  );
};

export default memo(Grid);
