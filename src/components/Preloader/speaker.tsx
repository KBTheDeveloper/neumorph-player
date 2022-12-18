import { ISpeakerPreloader } from "./types";
import React from "react";
import styled from 'styled-components';
const SpeakerPreloaderSC = styled.div({
  animation: "fadeIn 2s alternate",
  "@keyframes appearance": {
    "0%": {
      strokeDasharray: "0 468"
    },
    "100%": {
      strokeDasharray: "468 0"
    }
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0
    },
    "100%": {
      opacity: 1
    }
  },
  "@keyframes bubble": {
    "0%": {
      transform: "scale(1.04)"
    },
    "10%": {
      transform: "scale(1.02)"
    },
    "50%": {
      transform: "scale(1)"
    },
    "60%": {
      transform: "scale(1.04)"
    },
    "80%": {
      transform: "scale(1)"
    },
    "100%": {
      transform: "scale(1)"
    }
  },
  ".speaker__lf-inner": {
    animation: "appearance 2s, $bubble .7s infinite 1s",
    animationTimingFunction: "ease-in-out",
    transformOrigin: "center"
  },
  ".speaker__lf-outer": {
    animation: "appearance 2s, bubble .7s infinite 1s",
    animationTimingFunction: "ease-in-out",
    transformOrigin: "center"
  },
  ".speaker__body": {
    animation: "appearance 1.5s alternate"
  },
  ".speaker_crossover": {
    "& circle": {
      animation: "appearance 7s alternate"
    }
  }
});
const SpeakerPreloader: React.FunctionComponent<ISpeakerPreloader> = (props: ISpeakerPreloader): JSX.Element => {
  return (
    <SpeakerPreloaderSC className="preloader--speaker">
      <svg width={props.width} height={props.height} viewBox="0 0 93 145" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="speaker" id="speaker">
          <rect className='speaker__body' id="speaker_body" x="1" y="1" width="91" height="143" rx="15" stroke="url(#paint0_linear_37_64)" strokeWidth="4" />
          <circle className='speaker__lf-inner' id="lf_inner" cx="46.5" cy="95.5" r="10.5" stroke="#6E16D2" strokeWidth="4" />
          <circle className='speaker__lf-outer' id="lf_outer" cx="46.5" cy="95.5" r="31" stroke="url(#paint1_linear_37_64)" strokeWidth="4" />
          <g className='speaker__crossover' id="speaker_crossover">
            <circle cx="46.5" cy="27.5" r="7" stroke="#6E16D2" strokeWidth="4"/>
            <circle cx="40" cy="21" r="1" fill="#6E16D2" />
            <circle cx="53" cy="21" r="1" fill="#6E16D2" />
            <circle cx="53" cy="34" r="1" fill="#6E16D2" />
            <circle cx="40" cy="34" r="1" fill="#6E16D2" />
            <circle cx="46.5" cy="27.5" r="16.5" stroke="#6E16D2" strokeWidth="2" />
          </g>
        </g>
        <defs>
          <linearGradient id="paint0_linear_37_64" x1="46.5" y1="0" x2="46.5" y2="145" gradientUnits="userSpaceOnUse">
            <stop stopColor="#813ECE">
              <animate attributeName="stopColor"
                dur="2s"
                repeatCount="indefinite"
                values="#813ECE;#BB9ADF;#813ECE" />
            </stop>
            <stop offset="1" stopColor="#BB9ADF">
              <animate attributeName="stopColor"
                dur="2s"
                repeatCount="indefinite"
                values="#BB9ADF;#813ECE;#BB9ADF" />
            </stop>
          </linearGradient>
          <linearGradient id="paint1_linear_37_64" x1="46.5" y1="63" x2="46.5" y2="128" gradientUnits="userSpaceOnUse">
            <stop stopColor="#CA9DFE" />
            <stop offset="0.9999" stopColor="#7C3BC6" />
            <stop offset="1" stopColor="#727272" stopOpacity="0" />
            <stop offset="1" stopColor="#6510C9" />
          </linearGradient>
        </defs>
      </svg>
    </SpeakerPreloaderSC>);
};

export default SpeakerPreloader;