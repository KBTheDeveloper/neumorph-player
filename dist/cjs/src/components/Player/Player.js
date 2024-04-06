"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const howler_1 = require("howler");
const components_1 = require("./components");
const IconWrapper_1 = require("../Icon/IconWrapper");
const styles_1 = require("./styles");
const helpers_1 = require("../../utils/helpers");
const styled_components_1 = __importDefault(require("styled-components"));
const themes_1 = require("./styles/themes");
/***
 * To-Do: finalize and add video player feature to the next release 0.1.7
 */
// import VideoPlayer from "./VideoPlayer";
const array_1 = require("../../utils/array");
const Playlist = (0, helpers_1.lazy)(() => Promise.resolve().then(() => __importStar(require("./Playlist"))));
const Ripple_1 = __importDefault(require("../../components/Ripple"));
if (!customElements.get("ripple-element"))
    customElements.define("ripple-element", Ripple_1.default);
const PlayerWrapperSC = styled_components_1.default.div((props) => ({
    position: props.position,
    ...styles_1.playerStyles,
}));
const PlayerSC = styled_components_1.default.div((props) => ({
    ...themes_1.playerStyles[props.theme],
}));
const getTrackById = (tracks, id) => tracks.find((track) => track.id === id);
const getTrackIndex = (tracks, id) => tracks.findIndex((track) => track.id === id);
const getPlayingTrack = (tracks) => tracks.find((track) => track?.howl);
const resetHowls = (tracks) => {
    return tracks.map((track) => {
        track.howl = null;
        return track;
    });
};
const updatedTracks = (array, index, howl) => {
    const updatedTracks = [...array];
    updatedTracks[index].howl = howl;
    return updatedTracks;
};
class Player extends react_1.default.Component {
    // public videoPlayerRef: React.RefObject<HTMLVideoElement>;
    constructor(props) {
        super(props);
        this.state = {
            track: {
                playTime: "0:00",
                index: 0,
                percent: 0,
                loading: false,
                duration: "0:00",
                play: false,
                source: this.props.tracks[0],
            },
            tracks: this.props.tracks,
            playlist: false,
            settings: {
                volume: +JSON.parse(window.localStorage.getItem("player_settings"))?.settings?.volume / 100 || 0.5,
                muted: false,
                showSlider: false,
                shuffle: false,
                repeat: "off",
            },
        };
        this.play = this.play.bind(this);
        this.onTrackChange = this.onTrackChange.bind(this);
        this.createAudioTrack = this.createAudioTrack.bind(this);
        this.skip = this.skip.bind(this);
        this.stop = this.stop.bind(this);
        this.onClosePlaylist = this.onClosePlaylist.bind(this);
        this.togglePlaylist = this.togglePlaylist.bind(this);
        this.toggleShuffle = this.toggleShuffle.bind(this);
        this.onRepeat = this.onRepeat.bind(this);
        // this.videoPlayerRef = React.createRef();
    }
    componentWillUnmount() {
        howler_1.Howler.stop();
    }
    getReorderedTracks(values) {
        const movedTrackIndex = +this.state.tracks.findIndex((track) => track.id === values.moved);
        const targetTrackIndex = +this.state.tracks.findIndex((track) => track.id === values.target);
        const activeTrack = this.state.tracks[movedTrackIndex];
        const reorderedTracks = [...this.state.tracks];
        reorderedTracks.splice(movedTrackIndex, 1);
        reorderedTracks.splice(targetTrackIndex, 0, activeTrack);
        this.setState((state) => ({
            ...state,
            tracks: [...reorderedTracks],
        }));
    }
    skip(direction) {
        const { track, tracks } = this.state;
        const trackIndex = tracks.findIndex((item) => item.id === track.source.id);
        const index = direction === "next"
            ? trackIndex + 1 > tracks.length - 1
                ? 0
                : trackIndex + 1
            : trackIndex - 1 < 0
                ? tracks.length - 1
                : trackIndex - 1;
        const howl = getPlayingTrack(tracks);
        /**
         * Skip to the next or previous track.
         * @param  {String} direction 'next' or 'prev'.
         */
        // Get the next track based on the direction of the track.
        if (howl)
            howl.howl.stop();
        const clearedTracks = this.state.settings.shuffle ? (0, array_1.shuffle)(resetHowls(tracks)) : resetHowls(tracks);
        const newTrack = this.createAudioTrack(clearedTracks[index]);
        newTrack.play();
        //if (this.videoPlayerRef) this.videoPlayerRef.current?.play();
        const updTracks = updatedTracks(clearedTracks, index, newTrack);
        this.setState((state) => ({
            ...state,
            tracks: [...updTracks],
            track: {
                ...state.track,
                time: 0,
                play: true,
                percent: 0,
                index,
                source: {
                    ...updTracks[index],
                    howl: newTrack,
                },
            },
        }));
    }
    stop() {
        const { howl } = getPlayingTrack(this.state.tracks);
        howl.stop();
        this.setState((state) => ({
            ...state,
            track: {
                ...state.track,
                playTime: "0:00",
                source: {
                    ...state.track.source,
                    howl: null,
                },
                play: false,
            },
        }));
    }
    createAudioTrack(track) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const howl = new howler_1.Howl({
            src: [`/src/assets/audio/${track.filename}`],
            html5: true,
            onload: function () {
                self.setState((state) => ({
                    ...state,
                    track: {
                        ...state.track,
                        source: track,
                        // loading: sound.howl?.state() === 'loaded' ? false : true,
                        duration: (0, helpers_1.formatTime)(Math.round(state.track.source.howl?.duration())),
                    },
                }));
            },
            onend: function () {
                if (self.state.settings.repeat === "once") {
                    self.play(true, self.state.track.source.id);
                }
                else if (self.state.track.source.id === self.state.tracks.length && self.state.settings.repeat === "off") {
                    self.stop();
                }
                else if (self.state.settings.shuffle)
                    self.play(true, (0, array_1.shuffle)(self.state.tracks)[0].id);
                else
                    self.skip("next");
            },
            onseek: function () {
                // if (self.videoPlayerRef.current) {
                //   self.videoPlayerRef.current.currentTime = this._sounds[0]._seek;
                // }
            },
        });
        return howl;
    }
    play(value, id) {
        let tracksArr = this.state.tracks;
        const { track, tracks } = this.state;
        // if (this.videoPlayerRef.current!) this.videoPlayerRef?.current.play();
        const playingTrack = getPlayingTrack(tracks);
        if (playingTrack?.id !== id) {
            playingTrack?.howl?.stop();
            tracksArr = resetHowls(tracks);
        }
        const sound = id ? getTrackById(tracksArr, id) : track.source;
        if (!sound?.howl) {
            sound.howl = this.createAudioTrack(sound);
        }
        const index = id ? getTrackIndex(tracksArr, id) : track.index;
        tracksArr = updatedTracks(tracksArr, index, sound.howl);
        sound.howl.play();
        this.setState((state) => ({
            ...state,
            tracks: [...tracksArr],
            track: {
                ...state.track,
                play: value,
                // loading: sound.howl?.state() === 'loaded' ? false : true,
                source: sound,
                duration: (0, helpers_1.formatTime)(Math.round(sound.howl?.duration())),
            },
        }));
    }
    pause(value, id) {
        // Get the sound we want to manipulate.
        const { howl } = id ? getTrackById(this.state.tracks, id) : this.state.track.source;
        // Pause the sound.
        this.setState((state) => ({
            ...state,
            track: {
                ...state.track,
                play: value,
            },
        }));
        howl.pause();
        // if (this.videoPlayerRef.current!) this.videoPlayerRef?.current.pause();
    }
    onTrackChange(value, id) {
        if (value)
            this.play(value, id || null);
        else
            this.pause(value, id || null);
    }
    togglePlaylist() {
        this.setState((state) => ({ ...state, playlist: !state.playlist }));
    }
    onClosePlaylist(value) {
        this.setState((state) => ({ ...state, playlist: value }));
    }
    toggleShuffle() {
        this.setState((state) => ({
            ...state,
            settings: { ...state.settings, shuffle: !state.settings.shuffle },
        }));
    }
    onRepeat(value) {
        this.setState((state) => ({ ...state, settings: { ...state.settings, repeat: value } }));
    }
    render() {
        const position = this.props.position || "fixed";
        const { theme } = this.props;
        const { tracks, track, settings, playlist } = this.state;
        const playback = track.play ? "play" : "pause";
        const defaultButtonStyle = {
            boxShadow: themes_1.buttonStyles[theme].boxShadow,
            ...themes_1.buttonStyles[theme].defaultButton,
        };
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(PlayerWrapperSC, { position: position, className: 'playerWrapper' },
                react_1.default.createElement("div", { className: 'container' },
                    react_1.default.createElement("div", { className: 'grid' },
                        react_1.default.createElement("div", { className: 'grid__col-12 mb-0' },
                            react_1.default.createElement(PlayerSC, { "data-testid": 'player', theme: theme, className: 'player' },
                                react_1.default.createElement(components_1.TrackInfo, { title: track.source.title, cover: track.source.cover, artist: track.source.artist, track: track.source.howl, duration: track.duration }),
                                react_1.default.createElement("div", { className: 'controlsOuter px-6 px-xs-4' },
                                    react_1.default.createElement("div", { className: 'controlsInner d-flex align-items--center' },
                                        react_1.default.createElement(IconWrapper_1.IconWrapper, { title: 'Playlist', role: 'button', tabIndex: '0', noAlign: true, styles: defaultButtonStyle, classes: 'mr-5', iconName: 'playlist', onKeyPress: this.togglePlaylist, onClick: this.togglePlaylist }),
                                        react_1.default.createElement(components_1.Controls, { theme: theme, loading: track.loading, currentTrackIndex: track.index, items: tracks, onSkip: this.skip, onPlay: this.onTrackChange, playback: playback, onPause: this.onTrackChange, 
                                            // videoPlayer={
                                            //   <VideoPlayer
                                            //     ref={this.videoPlayerRef}
                                            //     sound={track.source.howl}
                                            //     url={track?.source?.video}
                                            //     theme={theme}
                                            //   />
                                            // }
                                            onShuffle: this.toggleShuffle, onRepeat: this.onRepeat }),
                                        react_1.default.createElement(components_1.Volume, { level: settings.volume, theme: theme, muted: settings.muted, slider: {
                                                value: settings.volume,
                                                start: 50,
                                            } }))),
                                react_1.default.createElement(components_1.Progress, { theme: this.props.theme, percent: track.percent, track: track }),
                                react_1.default.createElement(react_1.Suspense, { fallback: 'loading' },
                                    react_1.default.createElement(Playlist, { show: playlist, theme: theme, playback: this.onTrackChange, onReorder: this.getReorderedTracks.bind(this), onPlay: this.onTrackChange, onPause: this.onTrackChange, currentTrack: track, items: tracks, onClose: this.onClosePlaylist })))))))));
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map