import { hot } from "react-hot-loader";
import React, { Suspense } from "react";
import { lazy } from "../src/utils/helpers";
const Player = lazy(() => import("../src/components/Player/Player"));
export const App = () => {
    const tracks = [
        {
            title: "Demo Song 1",
            artist: "Chronoks",
            filename: "Chronoks - demo song 1.mp3",
            id: 1,
            howl: null,
            cover: "demo_song_placeholder_1.png",
            video: "src/assets/video/100_0001.mov",
        },
        {
            title: "Demo Song 2",
            artist: "Chronoks",
            filename: "Chronoks - demo song 2.mp3",
            id: 2,
            howl: null,
            cover: "demo_song_placeholder_2.png",
        },
        {
            title: "Demo Song 3",
            filename: "Chronoks - demo song 3.mp3",
            artist: "Unknown Artist",
            id: 3,
            howl: null,
            cover: "demo_song_placeholder_3.png",
        },
    ];
    const player = tracks.length > 0 ? React.createElement(Player, { tracks: tracks, theme: 'dark' }) : null;
    return (React.createElement(React.Fragment, null,
        React.createElement("main", { className: 'main' },
            React.createElement("div", { className: 'container' },
                React.createElement(Suspense, { fallback: "loading" }, player)))));
};
export default hot(module)(App);
//# sourceMappingURL=app.js.map