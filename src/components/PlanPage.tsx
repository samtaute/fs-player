import { View, lookbook } from "../definition";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import KbImage from "./KbImage";
import {parseParagraphs} from '../util/markdown' 
import dummyAd from '../assets/ad.png'


const PlanPage: React.FC<{
  idx: number;
  pageIdx: number;
  view: View;
  lookbookData: lookbook;
}> = ({ idx, pageIdx, view, lookbookData }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // const [height, setHeight] = useState(0);
  // const [width, setWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);
  const [frameWidth, setFrameWidth] = useState(0);
  function updateDimensions() {
    if (
      !elRef.current?.clientHeight ||
      !elRef.current?.clientWidth ||
      !frameRef.current?.clientHeight ||
      !frameRef.current?.clientHeight
    ) {
      return;
    }
    // setHeight(elRef.current?.clientHeight);
    // setWidth(elRef.current?.clientWidth);
    setFrameHeight(frameRef.current?.clientHeight);
    setFrameWidth(frameRef.current.clientWidth);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  let lookId: string;
  let caption: string = "";

  for (let pane of view.panes) {
    if (pane.lookUid) {
      lookId = pane.lookUid;
    }
    if (pane.translations) {
      caption = parseParagraphs(pane.translations.en);

    }
  }
  let look = lookbookData.looks.find((look) => {
    return look.uid === lookId;
  });

  let imageUrl = look?.images[0].url;

  return (
    <motion.div
      className="slide-container slide-container--plan"
      ref={elRef}
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="image-section">
        <div className="image-frame" ref={frameRef}>
          <KbImage
            kbParams={look?.kenBurnsParams!}
            imageUrl={imageUrl!}
            imageHeight={look?.images[0].height!}
            imageWidth={look?.images[0].width!}
            backgroundColor={look?.averageColor!}
            atStart={idx === 0 ? false : true}
            frameHeight={frameHeight}
            frameWidth={frameWidth}
          />
        </div>
      </div>
      {caption && (
        <div className="text-section text-section--plan">
          <div className="gradient-overlay gradient-overlay--plan"></div>
          <div className="description" dangerouslySetInnerHTML={{__html: caption}}></div>
          {/* <div className="description">{caption}</div> */}

          <div className="scroll-up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g filter="url(#filter0_d_631_7519)">
                <path
                  d="M6 17L12 12L18 17"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              <g filter="url(#filter1_d_631_7519)">
                <path
                  d="M6 12L12 7L18 12"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_631_7519"
                  x="5.25"
                  y="11.0237"
                  width="13.5"
                  height="7.7263"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_631_7519"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_631_7519"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d_631_7519"
                  x="5.25"
                  y="6.02372"
                  width="13.5"
                  height="7.7263"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_631_7519"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_631_7519"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default PlanPage;
