import React, { memo, useRef } from "react";
import { appPalette } from "../../utils/guides";
import styled from "styled-components";
const TooltipSC = styled.div((props) => ({
    position: "fixed",
    borderRadius: 5,
    display: props.show ? "block" : "none",
    boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.33)",
    backgroundColor: appPalette[props.theme],
    "&.tooltip--arrow_bottom": {
        "&:before": {
            content: "''",
            display: "block",
            position: "absolute",
            transform: "translateX(-50%)",
            left: "50%",
            bottom: -4,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid #fff",
        },
    },
}));
const Tooltip = memo((props) => {
    const ref = useRef(null);
    const defaultTheme = props.theme || "white";
    const dir = props.dir ? `tooltip--arrow_${props.dir}` : "tooltip--default";
    return (React.createElement(TooltipSC, { className: `tooltip ${dir} px-2 py-1`, theme: defaultTheme, show: props.show, style: { top: props.position.y, left: props.position.x }, ref: ref },
        React.createElement("span", null, props.text)));
});
Tooltip.displayName = "Tooltip";
export default Tooltip;
//# sourceMappingURL=index.js.map