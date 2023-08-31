import { motion } from "framer-motion";
import FrameOverlay from "./layout/FrameOverlay";
import { useState, useRef, useEffect } from "react";

const Page: React.FC<{
  data: {
    imageUrl: string;
    title: string;
    summary: string;
    lightLogo: string;
  };
}> = ({ data }) => {
  const elRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  function updateDimensions() {
    if (!elRef.current?.clientHeight || !elRef.current?.clientWidth) {
      return;
    }
    setHeight(elRef.current?.clientHeight);
    setWidth(elRef.current?.clientWidth);
  }

  useEffect(() => {
    updateDimensions(); 
    window.addEventListener("resize", updateDimensions);
    return () =>{
      window.removeEventListener('resize', updateDimensions)
    }
  }, []);

  return (
    <motion.div
      className="slide-container"
      ref={elRef}
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="image-section">
        <FrameOverlay width={width} height={height} />
        <img
          className="logo"
          src={data.lightLogo}
          alt="logo"
          style={{
            position: "absolute",
            width: "10rem",
            top: `${width / 9}px`,
            left: `${width / 9}px`,
          }}
        />
        <img
          className="background-image"
          alt="background"
          src={data.imageUrl}
        />
      </div>
      <div className="text-section">
        <div className="gradient-overlay"></div>
        <div className="title">{data.title}</div>
        <div className="description">{data.summary}</div>
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
      </div>
    </motion.div>
  );
};
export default Page;
