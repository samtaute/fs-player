import { lookbook } from "../definition";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import FrameOverlay from "./layout/FrameOverlay";
import KbImage from "./KbImage";

const CoverPage: React.FC<{
  lookbookData: lookbook;
  idx: number;
  pageIndex: number;
}> = ({ lookbookData, idx }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
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
    setHeight(elRef.current?.clientHeight);
    setWidth(elRef.current?.clientWidth);
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

  const coverUID = lookbookData.coverUID;
  const look = lookbookData.looks.find((look) => {
    return look.uid === coverUID;
  });

  let imageUrl = look?.images[0].url;

  return (
    <motion.div
      className="slide-container"
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
          <FrameOverlay width={width} height={height} />
          <img
            className="logo"
            src={lookbookData.ownedBy.logoLarge}
            alt="logo"
            style={{
              position: "absolute",
              width: "10rem",
              top: `${width / 9}px`,
              left: `${width / 9}px`,
            }}
          />
        </div>
      </div>
      <div className="text-section">
        <div className="gradient-overlay"></div>
        <div className="title">{lookbookData.title["en"]}</div>
        <div className="description description-cover">{lookbookData.summary["en"]}</div>
        <div className="cta">
          READ THE STORY
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.7803 6.21967C15.4874 5.92678 15.0126 5.92678 14.7197 6.21967C14.4268 6.51256 14.4268 6.98744 14.7197 7.28033L18.4393 11L3.75 11C3.33579 11 3 11.3358 3 11.75C3 12.1642 3.33579 12.5 3.75 12.5L18.4393 12.5L14.7197 16.2197C14.4268 16.5126 14.4268 16.9874 14.7197 17.2803C15.0126 17.5732 15.4874 17.5732 15.7803 17.2803L20.7803 12.2803L21.3107 11.75L20.7803 11.2197L15.7803 6.21967Z"
              fill="#EDEDED"
            />
          </svg>
        </div>
        <div className="ad-container">
            <div className="banner-ad">360 x 50</div>
          </div>
      </div>
    </motion.div>
  );
};

export default CoverPage;
