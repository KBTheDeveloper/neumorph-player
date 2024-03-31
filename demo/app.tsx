import { hot } from "react-hot-loader";
import React, { Suspense, FunctionComponent } from "react";
import { lazy } from "../src/utils/helpers";
import { TrackType } from "../src/components/Player/types";
const Player = lazy(() => import("../src/components/Player/Player"));

export const App: FunctionComponent = () => {
  const tracks: Array<TrackType> = [
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

  const player = tracks.length > 0 ? <Player tracks={tracks} theme='dark' /> : null;
  return (
    <>
      <main className='main'>
        <div className='container'>
          <Suspense fallback={"loading"}>{player}</Suspense>
        </div>
      </main>
    </>
  );
};

export default hot(module)(App);
