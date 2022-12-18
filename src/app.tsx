import { hot } from "react-hot-loader";
import React, { Suspense } from 'react';
import Ripple from './components/Ripple';
const Player = React.lazy(() => import("./components/Player/Player"));
customElements.define("ripple-element", Ripple);

export const App: React.FunctionComponent = (props: any) => {
  const tracks = [
    {
      title: "Demo Song 1",
      artist: "Chronoks",
      filename: "Chronoks - demo song 1.mp3",
      id: 1,
      howl: null,
      cover: "demo_song_placeholder_1.png"
    },
    {
      title: "Demo Song 2",
      artist: "Chronoks",
      filename: "Chronoks - demo song 2.mp3",
      id: 2,
      howl: null,
      cover: "demo_song_placeholder_2.png"
    },
    {
      title: 'Demo Song 3',
      filename: 'Chronoks - demo song 3.mp3',
      artist: "Unknown Artist",
      id: 3,
      howl: null,
      cover: "demo_song_placeholder_3.png"
    }
  ];

  const player = tracks.length > 0 ?
    <Player theme="light" tracks={tracks} /> : null;
  return (
    <main className="main">
      <div className="container">
        <Suspense fallback={"loading"}>
          {player}
        </Suspense>
      </div>
    </main>
  );

};

export default hot(module)(App);