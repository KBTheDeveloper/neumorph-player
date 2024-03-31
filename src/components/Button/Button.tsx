import React from "react";
import { mixins } from "../../styles/jss/mixins";
import { appPalette } from "../../utils/guides";
import styled from "styled-components";
import { ButtonProps } from "./types";

const ButtonSC = styled.button((props) => ({
  "&.button": {
    position: "relative",
    border: "1px solid transparent",
    fontWeight: 700,
    padding: "10px 5.5rem",
    ...mixins.neuMorphismShadow("4px 4px 8px rgba(0, 0, 0, 0.1)", "-4px -4px 8px rgba(255, 255, 255, 0.06)"),
    textTransform: "uppercase",
    borderRadius: 5,
    fontSize: "1.4em",
    cursor: "pointer",
    maxWidth: "100%",
    "&.visible ": {
      display: "block",
    },
    overflow: "hidden",
    transition: "all .1s linear",
    "&:focus": {
      ...mixins.neuMorphismShadow(
        "inset -4px -4px 8px rgba(255, 255, 255, 0.06)",
        "inset 4px 4px 8px rgba(255, 255, 255, 0.06)",
      ),
    },
    "&--white": {
      backgroundColor: appPalette.white,
      color: appPalette.darkGrey,
      "&:hover": {
        backgroundColor: appPalette.lightGrey,
      },
    },
    "&--violet": {
      ...mixins.neuMorphGradient({ first: "#4C155D", second: "#2A1433" }),
      color: appPalette.white,
      "&:hover": {
        ...mixins.neuMorphGradient({ first: "#2A1433", second: "#4C155D" }),
      },
    },
    "&--violet-gradient": {
      ...mixins.neuMorphGradient({ first: "#6E16D2", second: "#350C64" }),
      color: appPalette.white,
      borderColor: "#482C84",
      "&:hover": {
        ...mixins.neuMorphGradient({ first: "#350C64", second: "#6E16D2" }),
      },
    },
    "&--transparent": {
      boxShadow: "none",
      background: "transparent !important",
      color: appPalette[props.color],
      "&:focus": {
        boxShadow: "none !important",
      },
    },
    ...props.styles,
  },
  "&.close-btn--cross": {
    cursor: "pointer",
    width: 30,
    height: 30,
    position: "absolute",
    right: 5,
    top: -35,
    svg: {
      fill: appPalette.white,
    },
  },
  "&.playlist__item-play-btn": {
    width: 30,
    height: 30,
    display: "none",
  },
  "&:disabled": {
    backgroundColor: `${appPalette.lightGrey} !important`,
  },
  "&.fab ": {
    padding: 0,
    margin: 0,
    display: "flex",
    borderRadius: "50%",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  "&.fab--medium": {
    width: 50,
    height: 50,
  },
  "&.fab--small": {
    width: 30,
    height: 30,
  },
  "&.button--orange": {
    backgroundColor: appPalette.orange,
    color: appPalette.white,
  },
  "&.button--white": {
    backgroundColor: appPalette.white,
    color: appPalette.darkGrey,
    "&:hover": {
      backgroundColor: appPalette.lightGrey,
    },
  },
  "&.button--small": {
    padding: "10px 2rem",
    fontSize: 18,
  },
}));

const rippleProps = [
  { name: "x", value: "clientX" },
  { name: "y", value: "clientY" },
  { name: "width", value: "clientWidth" },
  { name: "height", value: "clientHeight" },
  { name: "left", value: "offsetLeft" },
  { name: "top", value: "offsetTop" },
];
export const Button = React.forwardRef((props: ButtonProps) => {
  const onClick = (e) => {
    if (props.clickHandler) {
      props.clickHandler(e);
    }
    const button = e.currentTarget;
    const ripple = document.createElement("ripple-element");
    const existedRipple = e.currentTarget.getElementsByTagName("ripple-element")[0];
    if (existedRipple) {
      existedRipple.remove();
    }
    for (const prop of rippleProps) {
      ripple.setAttribute(prop.name, (prop.name == "x" || prop.name == "y" ? e : button)[prop.value]);
    }
    e.currentTarget.appendChild(ripple);
  };
  const cls = props.classes ? `${props.classes.map((item) => item).join(" ")} ` : "";
  const classes = `button ${cls} ${props.view && /fab/.test(props.view) ? `fab ${props.view}` : props.view ? ` ${props.view}` : " "}${props.color ? " " + `button--${props.color}` : ""}${props.visibility ? " visible" : ""}`;
  const buttonTemplate = props.href ? (
    <a style={{ color: appPalette[props.color] }} href={String(props.href)} className={classes}>
      {props.text}
    </a>
  ) : (
    <ButtonSC
      tabIndex='0'
      color={props.color}
      disabled={props.disabled}
      className={classes}
      type={props.type}
      id={props.id}
      onClick={onClick}
    >
      {props.icon && (
        <svg width={props.icon.width} height={props.icon.height} viewBox={props.icon.viewBox}>
          <rect fill={props.color} width='100%' height='100%' />
          <path d={props.icon.path} />
        </svg>
      )}
      {props.text}
      {props.children}
    </ButtonSC>
  );
  return <React.Fragment>{buttonTemplate}</React.Fragment>;
});
Button.displayName = "Button";
