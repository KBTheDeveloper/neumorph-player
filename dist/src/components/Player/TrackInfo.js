import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { truncateStringStyle } from "../../utils/css";
import { appPalette } from "../../utils/guides";
import { formatTime } from "../../utils/helpers";
import { Column, Grid } from "../Grid";
import { breakpoints } from "../Grid/Grid";
import { bgCoverSet } from "../utils/css";
const TrackInfoSC = styled.div({
    color: appPalette.white,
    ".time": {
        fontSize: 20,
    },
    ".track-info__cover": {
        width: 50,
        height: 50,
        ...bgCoverSet({ size: "100%" }),
    },
    ".track-info__name": {
        fontWeight: 500,
        ...truncateStringStyle,
        paddingRight: 20,
    },
    ".track-info__artist-name": {
        fontWeight: 300,
    },
    [`@media${breakpoints.xs}`]: {
        ".time": {
            fontSize: 16,
        },
        ".track-info__name, .track-info__artist-name": {
            fontSize: 14,
        },
        ".track-info__cover": {
            width: 40,
            height: 40,
        },
    },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let requestAnimationFrameId;
const imagesPath = process.env.NODE_ENV === "development" ? "src/assets/img/" : "";
export const TrackInfo = (props) => {
    const [time, setTime] = useState("0:00");
    /**
     * The step called within requestAnimationFrame to update the playback position.
     */
    const step = function (context) {
        // Get the Howl we want to manipulate.
        const sound = context;
        // Determine our current seek position.
        const seek = sound.seek() || 0;
        setTime(formatTime(Math.round(seek || 0)));
        requestAnimationFrame(step.bind(null, context));
    };
    useEffect(() => {
        if (props.track) {
            requestAnimationFrameId = requestAnimationFrame(step.bind(null, props.track));
        }
    }, [props.track]);
    useEffect(() => function cleanup() {
        requestAnimationFrameId = null;
    });
    return (React.createElement(TrackInfoSC, { "data-testid": 'track-info' },
        React.createElement("div", { className: 'track-info px-6 py-4 pl-xs-4 pr-xs-4' },
            React.createElement(Grid, null,
                React.createElement(Column, { cols: { default: 12 } },
                    React.createElement("div", { className: 'track-info d-flex' },
                        React.createElement("div", { className: 'track-info__cover mr-2', style: { backgroundImage: `url(${imagesPath + props.cover}` } }),
                        React.createElement("div", { className: 'd-flex flex-column' },
                            React.createElement("div", { "data-testid": 'track-name', className: 'track-info__name' }, props.title),
                            React.createElement("div", { "data-testid": 'track-artist-name', className: 'track-info__artist-name' }, props.artist)),
                        React.createElement("div", { className: 'time d-inline-block ml-auto' },
                            React.createElement("span", { id: 'timer' }, time),
                            React.createElement("span", { className: 'separator' }, " / "),
                            React.createElement("span", { id: 'duration' }, props.duration))))))));
};
//# sourceMappingURL=TrackInfo.js.map