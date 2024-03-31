import { mixins } from "../../../styles/jss/mixins";
import { appPalette } from "../../../utils/guides";
import { breakpoints } from "../../Grid/Grid";
import { TIconBg } from "../types";
const playerGeneralStyles = {
  width: "100%",
  height: 150,
  position: "relative",
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  ...mixins.neuMorphismShadow(
    "inset 1px 2px 1px rgba(255, 255, 255, 0.06)",
    "inset -1px -2px 1px rgba(49, 48, 65, 0.25)",
  ),
};
const playerStyles = {
  dark: {
    ...playerGeneralStyles,
    boxShadow: `12px 12px 24px #171621,
    -12px -12px 24px #252435;`,
    backgroundColor: appPalette.darkPurple,
  },
  light: {
    ...playerGeneralStyles,
    background: appPalette.white,
    ".track-info__name, .track-info__artist-name, .time": {
      color: "#4A4A4A",
    },
  },
  "dark-red": {
    ...playerGeneralStyles,
    backgroundColor: appPalette.vinous.main,
  },
  blue: {
    ...playerGeneralStyles,
    backgroundColor: appPalette.blue.main,
  },
};

const generalButtonStyles = {
  boxShadow:
    "inset 1px 2px 1px rgba(255, 255, 255, 0.06), " +
    "inset -10px -10px 52px rgba(49, 48, 65, 0.25)," +
    " 8px 8px 12px rgba(0, 0, 0, 0.25), -8px -8px 12px rgba(63, 63, 65, 0.25)",
};
const genButtonStyles = ({
  defaultButton,
  playButton,
  shadow,
}: {
  defaultButton: TIconBg;
  playButton: TIconBg;
  shadow: string;
}): any => ({
  playButton: {
    boxShadow: shadow,
    background: playButton.bg,
    "&:hover": {
      background: playButton.hoverBg,
    },
  },
  defaultButton: {
    boxShadow: shadow,
    background: defaultButton.bg,
    "&:hover": {
      background: defaultButton.hoverBg,
    },
  },
});
const buttonShadows = {
  dark:
    "inset 1px 2px 1px rgba(255, 255, 255, 0.06), " +
    "inset -10px -10px 52px rgba(49, 48, 65, 0.25)," +
    " 2px 2px 3px rgba(0, 0, 0, 0.4), -2px -2px 3px rgba(67, 67, 70, 0.4)",
  light:
    "inset 1px 2px 1px rgba(255, 255, 255, 0.06), " +
    "inset -10px -10px 52px rgba(49, 48, 65, 0.25)," +
    " 2px 2px 3px rgba(174, 174, 192, 0.4), -2px -2px 3px #FFFFFF",
  blue:
    "inset 1px 2px 1px rgba(255, 255, 255, 0.06), " +
    "inset -10px -10px 52px rgba(49, 48, 65, 0.25)," +
    " 2px 2px 3px #242E9B, -2px -2px 3px rgba(107, 96, 255, 0.25)",
};

const buttonStyles = {
  dark: {
    ...genButtonStyles({
      playButton: {
        bg: "linear-gradient(180deg, #7334AE 0%, rgba(85, 29, 112, 0.93) 100%)",
        hoverBg: `linear-gradient(145deg, ${appPalette.violet2} 0%, ${appPalette.violet} 100%)`,
      },
      defaultButton: {
        bg: "linear-gradient(142.84deg, rgba(43, 42, 62, 0.93) 16.64%, #1E1D2B 86.06%)",
        hoverBg: `linear-gradient(145deg, ${appPalette.violet2} 0%, ${appPalette.violet} 100%)`,
      },
      shadow: buttonShadows.dark,
    }),
  },
  light: {
    ...genButtonStyles({
      playButton: {
        bg: appPalette.light.playButtonGradient,
        hoverBg: appPalette.light.playButtonHoverGradient,
      },
      defaultButton: {
        bg: appPalette.light.lightGradient,
        hoverBg: appPalette.light.lightGradientRev,
      },
      shadow: buttonShadows.light,
    }),
  },
  blue: {
    ...genButtonStyles({
      playButton: {
        bg: appPalette.blue.blueSkyGradient,
        hoverBg: appPalette.blue.blueSkyGradientRev,
      },
      defaultButton: {
        bg: appPalette.blue.lightBlueGradient,
        hoverBg: appPalette.blue.lightBlueGradientRev,
      },
      shadow: buttonShadows.blue,
    }),
  },
};
const progressStyles = {
  dark: {
    progressLine: {
      fill: `${appPalette.white} !important`,
    },
  },
  light: {
    progressLine: {
      fill: `${appPalette.light.text} !important`,
    },
  },
  "dark-red": {},
  blue: {},
};
const genVolumeStyles = (sliderBg, processBg) => ({
  sliderContainer: {
    ...generalButtonStyles,
    background: sliderBg,
  },
  processLine: {
    background: processBg,
  },
});
const volumeStyles = {
  dark: {
    ...genVolumeStyles(appPalette.darkPurple, appPalette.dark.violetGradient),
  },
  light: {
    ...genVolumeStyles(appPalette.light.main, appPalette.light.lightGradient),
  },
  "dark-red": {
    ...genVolumeStyles(appPalette.vinous.main, appPalette.vinous.lightRedGradient),
  },
  blue: {
    ...genVolumeStyles(appPalette.blue.main, appPalette.blue.blueSkyGradient),
  },
};
const playlistGeneralStyles = {
  position: "absolute",
  width: "100%",
  padding: "40px 0",
  boxSizing: "border-box",
  left: 0,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  ...mixins.neuMorphismShadow(
    "inset 1px 2px 1px rgba(255, 255, 255, 0.06)",
    "inset -1px -2px 1px rgba(49, 48, 65, 0.25)",
  ),
  [`@media${breakpoints.xs}`]: {
    padding: "40px 0 0 0",
  },
};
const TrackStyles = ({ color, bgColor, iconColor, shadow }) => ({
  "& .playlist__item": {
    fontSize: 16,
    lineHeight: 1.4,
    fontWeight: 400,
    background: bgColor,
    boxShadow: shadow.default,
    transition: "all .2s ease-in-out",
    "&-title, &-artist-name": {
      color,
    },
    "&:hover": {
      background: bgColor,
      cursor: "pointer",
      boxShadow: shadow.hover,
    },
    svg: {
      rect: {
        fill: iconColor.rectangle,
      },
      path: {
        fill: iconColor.path,
      },
    },
  },
});
const playlistStyles = {
  dark: {
    ...playlistGeneralStyles,
    background: appPalette.darkPurple,
    ...TrackStyles({
      color: appPalette.white,
      bgColor: appPalette.darkPurple,
      iconColor: {
        rectangle: appPalette.violet,
        path: appPalette.white,
      },
      shadow: {
        default: "-4px -4px 8px rgba(255, 255, 255, 0.03), 4px 4px 8px rgba(0, 0, 0, 0.25)",
        hover: "-6px -6px 8px rgba(255, 255, 255, 0.03), 6px 6px 8px rgba(0, 0, 0, 0.25)",
      },
    }),
  },
  light: {
    ...playlistGeneralStyles,
    ".close-btn--cross svg": {
      fill: appPalette.light.text,
    },
    background: appPalette.white,
    ...TrackStyles({
      color: appPalette.light.text,
      bgColor: appPalette.light.lightGradient,
      iconColor: {
        rectangle: appPalette.light.text,
        path: appPalette.white,
      },
      shadow: { default: "", hover: "" },
    }),
  },
  "dark-red": {
    ...playlistGeneralStyles,
    background: appPalette.vinous.main,
    ...TrackStyles({
      color: appPalette.white,
      bgColor: appPalette.redGradient,
      iconColor: {
        rectangle: appPalette.vinous.main,
        path: appPalette.white,
      },
      shadow: "",
    }),
  },
  blue: {
    ...playlistGeneralStyles,
    background: appPalette.blue.main,
    ...TrackStyles({
      color: appPalette.white,
      bgColor: appPalette.blue.trackGradient,
      iconColor: {
        rectangle: appPalette.blue.main,
        path: appPalette.white,
      },
      shadow: {
        default: "1.5px 1.5px 3px #242E9B, -1px -1px 3px rgba(107, 96, 255, 0.25)",
        hover: " 3px 3px 3px #242E9B, -3px -3px 3px rgba(107, 96, 255, 0.25)",
      },
    }),
  },
};
export { buttonStyles, progressStyles, playerStyles, volumeStyles, playlistStyles };
