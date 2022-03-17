import PropTypes from "prop-types";
import React from "react";

function Brain({ size, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="brain emoji"
      width={size}
      height={size}
      viewBox="0 0 72 72"
      {...props}
    >
      <g id="color">
        <line
          x1="16"
          x2="25.875"
          y1="35"
          y2="35"
          fill="#ea5a47"
          stroke="none"
        />
        <path
          fill="#ea5a47"
          stroke="none"
          d="M25.875,35c3.4167,0,4.75-2.9167,4.75-6.1667"
        />
        <line
          x1="16"
          x2="19.75"
          y1="45.5"
          y2="45.5"
          fill="#ea5a47"
          stroke="none"
        />
        <line
          x1="35.2997"
          x2="35.2997"
          y1="45.5"
          y2="39.4375"
          fill="#ea5a47"
          stroke="none"
        />
        <path
          fill="#ea5a47"
          stroke="none"
          d="M35.2997,39.4375c0-2.2455,1.2003-5.25,5.0756-5.25"
        />
        <line
          x1="58.4583"
          x2="49.875"
          y1="34.5417"
          y2="34.5417"
          fill="#ea5a47"
          stroke="none"
        />
        <path
          fill="#FFA7C0"
          stroke="none"
          d="M40.375,45.5c0,0,0.1642,10.5-7.9583,10.5H16c-7.2083,0-7.6667-10.5,0-10.5C8.7917,45.5,8.3333,35,16,35 c-8.1667-7.25,1.875-13.5625,6.5-8.6875c-4.799-6.625,5.375-10.3125,8.875-5C30.9627,16,36.2222,15.0417,41.1003,19.024 l-0.4336,0.351c2.375-2.375,10.1776-1.0833,10.1776,5.3141l-2.2192,1.6234c6.8646-6.8646,14.2083,4.1875,8.5,8.2292h1.3333 c4.75,0,5.2917,10.9583-1.3333,10.9583H29.2917"
        />
        <path
          fill="#ea5a47"
          stroke="none"
          d="M40.6667,19.375c-2.4167,2.4167-0.2822,3.1782-4.2707,7.1667"
        />
      </g>
      <g id="hair" />
      <g id="skin" />
      <g id="skin-shadow" />
      <g id="line">
        <line
          x1="16"
          x2="25.875"
          y1="35"
          y2="35"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M25.875,35c3.4167,0,4.75-2.9167,4.75-6.1667"
        />
        <line
          x1="16"
          x2="19.75"
          y1="45.5"
          y2="45.5"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          x1="35.2997"
          x2="35.2997"
          y1="45.5"
          y2="39.4375"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M35.2997,39.4375c0-2.2455,1.2003-5.25,5.0756-5.25"
        />
        <line
          x1="58.4583"
          x2="49.875"
          y1="34.5417"
          y2="34.5417"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M40.375,45.5c0,0,0.1642,10.5-7.9583,10.5H16c-7.2083,0-7.6667-10.5,0-10.5C8.7917,45.5,8.3333,35,16,35 c-8.1667-7.25,1.875-13.5625,6.5-8.6875c-4.799-6.625,5.375-10.3125,8.875-5C30.9627,16,36.2222,15.0417,41.1003,19.024 l-0.4336,0.351c2.375-2.375,10.1776-1.0833,10.1776,5.3141l-2.2192,1.6234c6.8646-6.8646,14.2083,4.1875,8.5,8.2292h1.3333 c4.75,0,5.2917,10.9583-1.3333,10.9583H29.2917"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M40.6667,19.375c-2.4167,2.4167-0.2822,3.1782-4.2707,7.1667"
        />
      </g>
    </svg>
  );
}

Brain.defaultProps = {
  size: 24,
};

Brain.propTypes = {
  size: PropTypes.number,
};

export default Brain;
