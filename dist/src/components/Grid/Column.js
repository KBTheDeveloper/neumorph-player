import React, { memo } from "react";
import styled from "styled-components";
import { breakpoints, gridOptions } from "./Grid";
const calcColsInPercents = (size) => `${(+size / 12) * 100}%`;
const createSelector = (point, props) => {
    const name = `@media${breakpoints[point]}`;
    return { [name]: props };
};
const generateProps = (propValue, type) => {
    const props = {
        cols: {
            flex: `0 0 ${calcColsInPercents(propValue)}`,
            maxWidth: calcColsInPercents(propValue),
        },
        order: {
            order: propValue,
        },
        offset: {
            marginLeft: calcColsInPercents(propValue),
        },
        verticalAlign: {
            alignItems: propValue,
        },
        horizontalAlign: {
            justifyContent: propValue,
        },
    };
    return props[type];
};
const createMediaQuery = (points, type, prop) => {
    const mediaQueries = {};
    for (const point in points) {
        if (prop && prop[point] && point !== "default") {
            Object.assign(mediaQueries, createSelector(point, generateProps(prop[point], type)));
        }
    }
    return mediaQueries;
};
const createMediaQueries = (points, props) => {
    const types = ["cols", "offset", "horizontalAlign", "verticalAlign", "order"];
    let mediaQueries = {};
    types.forEach((type) => (mediaQueries = { ...mediaQueries, ...createMediaQuery(points, type, props[type]) }));
    return mediaQueries;
};
const ColumnSC = styled.div((props) => ({
    ...(props.cols?.default && { flex: `0 0 ${(props.cols.default / 12) * 100}%` }),
    maxWidth: (props.cols.default / 12) * 100 + "%",
    paddingLeft: `${gridOptions.gutter}px`,
    paddingRight: `${gridOptions.gutter}px`,
    ...(props.colOffset && props.colOffset?.default && { marginLeft: `${(props.colOffset.default / 12) * 100}%` }),
    ...(props.colOrder && props.colOrder?.default && { order: props.colOrder.default }),
    width: "100%",
    "-webkit-box-flex": 0,
    ...createMediaQueries(breakpoints, {
        cols: props.cols,
        offset: props.colOffset,
        order: props.colOrder,
        verticalAlign: props.align?.vertical,
        horizontalAlign: props.align?.horizontal,
    }),
}));
const Column = (props) => {
    const classesString = props.classes || "";
    const colOffset = props.offset;
    const colOrder = props.order;
    return (React.createElement(React.Fragment, null,
        React.createElement(ColumnSC, { style: props.style, colOffset: colOffset, colOrder: colOrder, align: props.align, cols: props.cols, className: classesString }, props.children)));
};
export default memo(Column);
//# sourceMappingURL=Column.js.map