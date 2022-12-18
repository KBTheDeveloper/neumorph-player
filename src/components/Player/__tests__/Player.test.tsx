import '@testing-library/jest-dom'
import * as React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import Player from "../Player";
import '../../../../utils/SVGMocks';
import '../../../../utils/HowlerMock';

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
    artist: "Chronoks",
    id: 3,
    howl: null,
    cover: "demo_song_placeholder_3.png"
  }
];

afterEach(cleanup);

test("load default track in player", async () => {
  const { container } = render(<Player theme="dark" tracks={tracks} />);
  await waitFor(() => expect(container.querySelector(".track-info__name").textContent).toBe("Demo Song 1"));
  await waitFor(() => expect(container.querySelector(".track-info__artist-name").textContent).toBe("Chronoks"));
});

test("play default track in player", async () => {
  const { findByTitle } = render(<Player theme="dark" tracks={tracks} />);
  await waitFor(async () => {
    const playBtn = await findByTitle("Play");
    fireEvent.click(playBtn)});
  await waitFor(async () => expect(await findByTitle("Pause")).toBeInTheDocument());
});

test("play next track in player", async () => {
  const { getByTitle, container } = render(<Player theme="dark" tracks={tracks} />);
  const nextButton = getByTitle("Next track");
  fireEvent.click(nextButton);
  await waitFor(() =>expect(container.querySelector(".track-info__name").textContent).toBe("Demo Song 2"));
  await waitFor(() =>expect(container.querySelector(".track-info__artist-name").textContent).toBe("Chronoks"));
});


test("play previous track in player", async () => {
  const { getByTitle, container } = render(<Player theme="dark" tracks={tracks} />);
  const previousButton = getByTitle("Previous track");
  fireEvent.click(previousButton);
  await waitFor(() => {
    expect(container.querySelector(".track-info__name").textContent).toBe("Demo Song 3");
    expect(container.querySelector(".track-info__artist-name").textContent).toBe("Chronoks");
  }, { timeout: 2000 });
});

test("open and close playlist", async () => {
  const { getByTitle, container } = render(<Player theme="dark" tracks={tracks} />);
  const playlistButton = getByTitle("Playlist");
  fireEvent.click(playlistButton);
  await waitFor(() => {
    expect(container.querySelector(".playlist")).toHaveStyle("display: block");
    fireEvent.click(playlistButton);
  }, { timeout: 1000 });
  await waitFor(() => {
    expect(container.querySelector(".playlist")).toHaveStyle("display: none");
  }, { timeout: 1000 });
});

test("show volume", async () => {
  const { container } = render(<Player theme="dark" tracks={tracks} />);
  const volumeButton = container.querySelector(".btn--volume");
  fireEvent.pointerOver(volumeButton);
  await waitFor(() => {
    expect(volumeButton).toHaveClass("visible");
  }, { timeout: 2000 });
});