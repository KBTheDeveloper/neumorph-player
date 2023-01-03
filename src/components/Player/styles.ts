import { breakpoints } from '../../components/Grid/Grid';
import { keyFrames } from './../../../src/styles/jss/keyframes';

import { appPalette } from "../../utils/guides";
import { mixins } from '../../styles/jss/mixins';
const stylesInst = {
  "@keyframes fadeIn": keyFrames["@keyframes fadeIn"],
  "@keyframes fadeOut": keyFrames["@keyframes fadeOut"],
  ".controlsInner": {
    width: "100%"
  },
  "&.playerWrapper": {
    bottom: 0,
    left: 0,
    width: "100%",
    transition: "all .2s",
    transitionTimingFunction: "cubic-bezier(0.18, 0.89, 0.1, 1.04)",
    "&.hidden": {
      "& [class*=playerCurtain]" : {
        visibility: "visible",
        transform: "translate(-50%, 0)",
      },
      transform: "translateY(100%)",
      transitionTimingFunction: "ease-out",
    },
    "&:hover": {
      "& > [class*=Player-playerCurtain]" : {
        visibility: "visible",
        transform: "translate(-50%, 0)",
      },
    },
  },
  ".playerCurtain": {
    position: "absolute",
    display: "flex",
    visibility: "hidden",
    justifyContent: "center",
    left: "50%",
    transform: "translate(-50%, 30%)",
    top: -30,
    width: 40,
    height: 30,
    borderTopRightRadius: "50%",
    borderTopLeftRadius: "50%",
    transition: "all .1s ease-in-out",
    ...mixins.neuMorphismShadow(),
    ...mixins.neuMorphGradient({first: appPalette.darkPurple, second: appPalette.darkPurple}, true),
    cursor: "pointer",
    "& [class*=iconWrapper]": {
      
    }
  },
  ".iconWrapper": {
    width: "30px !important",
    height: "30px !important"
  },
  [`@media${breakpoints.xs}`]: {
    ".player": {
      height: 145
    }
  },
  ".volumeSlider": {
    minWidth: 250,
    writingMode: "bt-lr", /* IE */
    "-webkit-appearance": "none", /* Chromium */
    width: "100%",
    height: 10,
    borderRadius: 5,
    transform: "rotate(-90deg)",
    "&::-webkit-slider-thumb": {
      width: 15,
      height: 15,
      "-webkit-appearance": "none",
      appearance: "none",
      border: `1px solid ${appPalette.orange}`,
      borderRadius: "50%",
      backgroundColor: appPalette.orange,
      cursor: "pointer",
      // marginLeft: -5,
      /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
      boxShadow: `0px 0px 5px ${appPalette.orange}, 0px 0px 1px ${appPalette.orange}`/* Add cool effects to your sliders! */
    },
    "&::-ms-track": {
      width: "100%",
      cursor: "pointer",

      /* Hides the slider so custom styles can be added */
      background: "transparent",
      borderColor: "transparent",
      color: "transparent",
      // border-radius: @track-radius;
      // border: @track-border-width solid @track-border-color;
    }
  },
  ".sliderBtn": {
    "&.toggled": {
      boxShadow: `0px 0px 0px 4px rgb(${appPalette.orangeRgb}) !important`,
    },
    transition: "all .3s ease"
  },

};
export const playerStyles = stylesInst;