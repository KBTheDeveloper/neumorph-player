import { mdiClose } from "@mdi/js";
import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Button, Column, Grid, Track } from "..";
import { scrollBarStyle } from "../../utils/css";
import { appPalette } from "../../utils/guides";
import { playlistStyles } from "./styles/themes";
import { keyFrames } from "../../styles/jss/keyframes";
const scrollBarStyles = {
    bar: {
        width: 8,
    },
    track: {
        background: "transparent",
    },
    thumb: {
        border: "1px solid transparent",
        borderRadius: 4,
        background: appPalette.white,
    },
};
const PlaylistContainer = styled.div({
    "@keyframes fadeIn": keyFrames["@keyframes fadeIn"]("bottom", 140),
    paddingTop: 10,
    maxHeight: "600px",
    height: "100%",
    overflowY: "auto",
    paddingRight: 10,
    paddingLeft: 10,
    ...scrollBarStyle(scrollBarStyles),
});
const PlaylistWrapper = styled.div((props) => ({
    ...playlistStyles[props.theme],
    animation: "fadeIn .2s",
    ul: {
        padding: 0,
    },
}));
const closeStyles = {
    svg: {
        fill: appPalette.white,
    },
};
const Playlist = (props) => {
    const [bottom, setBottom] = useState("");
    const [movedTrackIndex, setMovedTrackIndex] = useState(null);
    const listRef = useRef(null);
    const listContainer = useRef(null);
    const onPlaybackChange = useCallback((value, id) => {
        props.playback(value, id);
    }, []);
    const onMove = (id) => {
        setMovedTrackIndex(id);
    };
    const items = props.items.map((item, i) => (React.createElement(Track, { onShuffle: props.onShuffle, onRepeat: props.onRepeat, onMove: onMove, theme: props.theme, onPause: onPlaybackChange, index: i, onPlay: onPlaybackChange, item: item, key: item.id })));
    const onClosePlaylist = useCallback(() => props.onClose(false), []);
    useEffect(() => {
        const { height } = listRef.current.closest(".player").getBoundingClientRect();
        setBottom(`${height - 5}px`);
    }, []);
    const onDrop = (e) => {
        const item = e.target.closest(".playlist__item");
        props.onReorder({ moved: movedTrackIndex, target: +item.dataset.track });
    };
    return (React.createElement(PlaylistWrapper, { "data-testid": 'playlist', id: 'playlist', hidden: !props.show, theme: props.theme, bottom: bottom, className: 'playlist', ref: listRef, style: { bottom } },
        React.createElement("div", { className: 'container' },
            React.createElement(Grid, null,
                React.createElement(Column, { cols: { default: 12 } },
                    React.createElement(Button, { id: 'closePlaylistBtn', styles: closeStyles, classes: ["close-btn--cross"], clickHandler: onClosePlaylist, view: 'fab', icon: { path: mdiClose, width: 30, height: 30, viewBox: "0 0 25 25", color: appPalette.white }, color: 'transparent' }),
                    React.createElement(PlaylistContainer, { id: 'playlistContainer' },
                        React.createElement("ul", { onDrop: onDrop, ref: listContainer }, items)))))));
};
export default Playlist;
//# sourceMappingURL=Playlist.js.map