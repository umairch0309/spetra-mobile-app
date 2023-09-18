import React from "react";

export default function Chatbox({ colorOne, colorTwo }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M24 43C34.4934 43 43 34.4934 43 24C43 13.5066 34.4934 5 24 5C13.5066 5 5 13.5066 5 24C5 34.4934 13.5066 43 24 43Z"
          fill={colorOne}
        />
        <path
          d="M24 18C20.1402 18 17 20.8261 17 24.3C17 25.5143 17.3841 26.6905 18.1126 27.7076C17.9747 29.2329 17.6051 30.3652 17.0684 30.9017C16.9975 30.9726 16.9797 31.0811 17.0245 31.1707C17.0642 31.2507 17.1459 31.3 17.2334 31.3C17.2441 31.3 17.2548 31.2993 17.2658 31.2976C17.3603 31.2843 19.5555 30.9684 21.1433 30.0519C22.0449 30.4156 23.0053 30.6 24 30.6C27.8598 30.6 31 27.7738 31 24.3C31 20.8261 27.8598 18 24 18ZM20.7334 25.2333C20.2186 25.2333 19.8 24.8147 19.8 24.3C19.8 23.7853 20.2186 23.3667 20.7334 23.3667C21.2481 23.3667 21.6667 23.7853 21.6667 24.3C21.6667 24.8147 21.2481 25.2333 20.7334 25.2333ZM24 25.2333C23.4853 25.2333 23.0667 24.8147 23.0667 24.3C23.0667 23.7853 23.4853 23.3667 24 23.3667C24.5148 23.3667 24.9334 23.7853 24.9334 24.3C24.9334 24.8147 24.5148 25.2333 24 25.2333ZM27.2667 25.2333C26.7519 25.2333 26.3334 24.8147 26.3334 24.3C26.3334 23.7853 26.7519 23.3667 27.2667 23.3667C27.7814 23.3667 28.2 23.7853 28.2 24.3C28.2 24.8147 27.7814 25.2333 27.2667 25.2333Z"
          fill={colorTwo}
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
