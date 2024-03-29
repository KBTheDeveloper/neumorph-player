import '@testing-library/jest-dom'
import * as React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import Player from "../../";
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


test("render player", async () => {
  const { container } = render(<Player theme="dark" tracks={tracks} />);
  expect(Howler);
  await waitFor(() => expect(container.querySelector(".playerWrapper")).toBeTruthy());
  cleanup();
});


test("load default track in player", async () => {
  const { getByTestId } = render(<Player theme="dark" tracks={tracks} />);
  expect(Howler);
  await waitFor(() => {
    expect(getByTestId("track-artist-name").textContent).toBe("Chronoks");
    expect(getByTestId("track-name").textContent).toBe("Demo Song 1");
  });
  cleanup();
});

test("play default track in player", async () => {
  const { container } = render(<Player theme="dark" tracks={tracks} />);
  expect(Howler);
  const playBtn = container.querySelector(".btn--play") as HTMLElement;
  fireEvent.click(playBtn);
  await waitFor(async () => {
    expect(container.querySelector(".btn--pause")).toBeInTheDocument()
  }, { timeout: 3000 });
  cleanup();
});

test("play next track in player", async () => {
  const { findByTestId, getByTitle } = render(<Player theme="dark" tracks={tracks} />);
  expect(Howler);
  const nextButton = getByTitle("Next track");
  fireEvent.click(nextButton);
  const trackNameEL = await findByTestId("track-name");
  const trackArtistNameEL = await findByTestId("track-artist-name");
  await waitFor(async () => {
    expect(trackArtistNameEL.textContent).toBe("Chronoks");
    expect(trackNameEL.textContent).toBe("Demo Song 2");
  });
  cleanup();
});


test("play previous track in player", async () => {
  const { getByTitle, getByTestId } = render(<Player theme="dark" tracks={tracks} />);
  expect(Howler);
  fireEvent.click(getByTitle("Previous track"));
  await waitFor(async () => {
    expect(getByTestId("track-name").textContent).toBe("Demo Song 3");
    expect(getByTestId("track-artist-name").textContent).toBe("Chronoks");
  }, { timeout: 3000 });
  cleanup();
});

test("open and close playlist", async () => {
  const { getByTitle, container } = render(<Player theme="dark" tracks={tracks} />);
  expect(Howler);
  const playlistButton = getByTitle("Playlist");
  fireEvent.click(playlistButton);
  await waitFor(() => {
    expect(container.querySelector(".playlist")).toHaveStyle("display: block");
    fireEvent.click(playlistButton);
  }, { timeout: 1000 });
  await waitFor(() => {
    expect(container.querySelector(".playlist")).toHaveStyle("display: none");
  }, { timeout: 1000 });
  cleanup();
});

test("show volume", async () => {
  const { container } = render(<Player theme="dark" tracks={tracks} />);
  const volumeButton = container.querySelector(".btn--volume") as HTMLButtonElement;
  fireEvent.pointerOver(volumeButton);
  await waitFor(() => {
    expect(volumeButton).toHaveClass("visible");
  }, { timeout: 2000 });
  cleanup();
});