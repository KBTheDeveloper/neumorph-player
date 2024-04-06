import React from "react";
import styled from "styled-components";
import { Icon } from "./Icon";
const IconWrapperSC = styled.div((props) => ({
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: props.width || 40,
    height: props.height || 40,
    ...(props.onClick && { cursor: "pointer" }),
    ...props.customStyle,
    ...(props.disabled && {
        pointerEvents: "none",
        opacity: 0.6,
    }),
}));
export const IconWrapper = function (props) {
    const customStyles = props.styles?.name || "";
    const height = props.sizes?.height ?? "25";
    const width = props.sizes?.width ?? "25";
    const vb = props.sizes?.viewBox ?? null;
    const icon = props.icon ? (React.createElement(Icon, { width: width, height: height, color: props.color, icon: props.icon, iconName: null })) : (React.createElement(Icon, { width: width, viewBox: vb, height: height, color: props.color, noAlign: props.noAlign, iconName: props.iconName }));
    const classes = props.classes || "";
    return (React.createElement(React.Fragment, null,
        React.createElement(IconWrapperSC, { title: props.title, role: props.role, tabIndex: props.tabIndex, onClick: props.onClick, customStyle: props.styles, width: props.sizes?.width, disabled: props.disabled, height: props.sizes?.height, className: `${classes} ${customStyles}`, onKeyPress: props.onKeyPress }, icon)));
};
//# sourceMappingURL=IconWrapper.js.map