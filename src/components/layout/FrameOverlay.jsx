import * as React from "react";
const FrameOverlay = ({width, height}) => {
  
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width*1.5}
    viewBox={`0 0 ${width} ${width*1.5}`}
    fill="none"
    className="svg"
  >
    <g
      style={{
        mixBlendMode: "multiply",
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={`M${width} 0H0V${height}H${width}V0ZM${width/1.125} ${width/9}H${width/9}V${height/1.15}H${width/1.125}V${width/9}`}
        fill="url(#paint0_linear_1_11741)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1_11741"
        x1={width/2}
        y1={0}
        x2={width/2}
        y2={height}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity={0.9} />
        <stop offset={1} stopOpacity={0.2} />
      </linearGradient>
    </defs>
  </svg>
)};
export default FrameOverlay;