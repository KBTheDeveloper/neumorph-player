import React, { useEffect, useState } from "react";
import { IconWrapper } from "..";
import { buttonStyles } from "./styles/themes";
import { appPalette } from "../../utils/guides";
import { isMobile } from "../../utils/browser";
export const Controls = (props) => {
    const currentTrack = props.items.find((track) => track.howl) || props.items[0];
    const videoPlayerRef = React.useRef(null);
    const setVideoCurrentTime = () => (videoPlayerRef.current.currentTime = currentTrack.howl.seek());
    const [shuffle, setShuffle] = useState(JSON.parse(localStorage.getItem("settings"))?.shuffle || false);
    const [repeat, setRepeat] = useState("off");
    const onPlay = (id) => {
        props.onPlay(true, id);
        if (videoPlayerRef.current) {
            videoPlayerRef.current.play();
            setVideoCurrentTime();
        }
    };
    const onPause = (id) => {
        props.onPause(false, id);
        if (videoPlayerRef.current) {
            videoPlayerRef.current.pause();
            setVideoCurrentTime();
        }
    };
    const seekTypes = {
        fw: (howl) => howl.seek(howl.seek() + 10),
        rew: (howl) => howl.seek(howl.seek() - 10),
    };
    const seek = (type) => {
        const { howl } = props.items.find((track) => track.howl);
        if (!howl)
            return;
        seekTypes[type](howl);
        if (videoPlayerRef) {
            setVideoCurrentTime();
        }
    };
    const onPrev = () => {
        props.onSkip("prev");
        if (videoPlayerRef.current) {
            videoPlayerRef.current.play();
            setVideoCurrentTime();
        }
    };
    const onNext = () => {
        props.onSkip("next");
        if (videoPlayerRef.current) {
            videoPlayerRef.current.play();
            setVideoCurrentTime();
        }
    };
    const togglePlay = () => {
        if (currentTrack?.howl && !currentTrack?.howl._sounds[0]._paused) {
            onPause(currentTrack?.id);
        }
        else {
            onPlay(currentTrack?.id || 1);
        }
    };
    const keys = {
        ArrowRight: () => seek("fw"),
        ArrowLeft: () => seek("rew"),
        Space: () => {
            togglePlay();
        },
        Enter: (event) => {
            const playButton = event.target.closest(".btn--play") || event.target?.closest(".btn--pause]");
            if (!playButton)
                return;
            if (playButton.classList.contain("btn---pause"))
                playButton.focus();
            togglePlay();
        },
    };
    const onKeyDown = (event) => {
        if (event.code in keys) {
            keys[event.code](event);
        }
    };
    const onShuffle = () => {
        setShuffle(!shuffle);
        props.onShuffle();
    };
    const onRepeat = () => {
        if (repeat === "off")
            setRepeat("on");
        else if (repeat === "on")
            setRepeat("once");
        else
            setRepeat("off");
    };
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return function cleanup() {
            document.removeEventListener("keydown", onKeyDown);
        };
    });
    useEffect(() => props.onRepeat(repeat), [repeat]);
    const playButtonStyle = {
        ...buttonStyles[props.theme].playButton,
    };
    const defaultButtonStyle = {
        ...buttonStyles[props.theme].defaultButton,
    };
    const shuffleButtonStyle = {
        ...buttonStyles[props.theme].defaultButton,
        ...(shuffle && { background: `linear-gradient(145deg, ${appPalette.violet2} 0%, ${appPalette.violet} 100%)` }),
    };
    const repeatButtonStyle = {
        ...buttonStyles[props.theme].defaultButton,
        ...((repeat === "on" || repeat === "once") && {
            background: `linear-gradient(145deg, ${appPalette.violet2} 0%, ${appPalette.violet} 100%)`,
        }),
    };
    const buttons = props.playback === "play" ? (React.createElement(IconWrapper, { "data-testid": 'pause-btn', role: 'button', title: 'Pause', tabIndex: '0', noAlign: true, styles: playButtonStyle, classes: 'btn--pause mr-5', iconName: 'pause', onClick: togglePlay, onKeyPress: togglePlay })) : (React.createElement(IconWrapper, { title: 'Play', role: 'button', tabIndex: '0', styles: playButtonStyle, noAlign: true, classes: 'btn--play mr-5', iconName: 'play', onClick: togglePlay, onKeyPress: togglePlay }));
    return (React.createElement("div", { "data-testid": 'controls', className: 'controls d-flex align-items--center' },
        !isMobile() && (React.createElement(IconWrapper, { noAlign: true, title: 'Previous track', role: 'button', tabIndex: '0', styles: defaultButtonStyle, classes: 'mr-5', iconName: 'prev', onClick: onPrev, onKeyPress: onPrev })),
        React.createElement("div", { id: 'loading', style: { display: props.loading ? "block" : "none" }, className: 'mr-5' }),
        buttons,
        !isMobile() && (React.createElement(IconWrapper, { title: 'Next track', role: 'button', noAlign: true, tabIndex: '0', classes: 'mr-5', styles: defaultButtonStyle, iconName: 'next', onClick: onNext, onKeyPress: onNext })),
        !isMobile() && (React.createElement(IconWrapper, { title: 'Shuffle tracks', role: 'button', noAlign: true, tabIndex: '0', classes: 'mr-5', styles: shuffleButtonStyle, iconName: 'shuffle', onClick: onShuffle })),
        !isMobile() && (React.createElement(IconWrapper, { title: 'Repeat', role: 'button', noAlign: true, tabIndex: '0', classes: 'mr-5', styles: repeatButtonStyle, iconName: repeat === "once" ? "repeatOnce" : "repeat", onClick: onRepeat })),
        props.videoPlayer));
};
//# sourceMappingURL=Controls.js.map