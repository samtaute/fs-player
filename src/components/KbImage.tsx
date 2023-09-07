import { useEffect, useState } from "react";
import { kenBurnsParam, kenBurnsParams } from "../definition";

const KbImage: React.FC<{
  kbParams: kenBurnsParams;
  imageUrl: string;
  imageHeight: number;
  imageWidth: number;
  backgroundColor: string;
  atStart: boolean;
  frameHeight: number;
  frameWidth: number;
}> = ({
  kbParams,
  imageUrl,
  imageHeight,
  imageWidth,
  backgroundColor,
  atStart,
  frameHeight,
  frameWidth,
}) => {

  function kbRatio(key: string){
    let parts = key.split(':'); 
    if(parts.length === 2){
        let denom = parseFloat(parts[1]);
        if (denom === 0.0){
            return 0.0; 
        }
        let num = parseFloat(parts[0]); 
        return num / denom
    }
    return parseFloat(key); 
  }  
  //grab the 3:4 kb params
  let answer = null; 
  let answerValue = 10000.0;
  let aspectRatio = frameWidth / frameHeight;
  for (let key in kbParams){
    let ratio = kbRatio(key)
    if (ratio !== 0.0){
        var newValue = Math.abs(1.0 - aspectRatio / ratio); 
        if (newValue < answerValue){
            answerValue = newValue; 
            answer = key; 
        }
    }
  }
  let kbp: kenBurnsParam; 

  if (answer === '0:0'|| answer ==='1:1'||answer==='1:3'||answer==='3:1'|| answer === '4:3'|| answer==='9:4'){
     kbp = kbParams[answer]
  }else{kbp=kbParams['4:3']}
  
  const [animate, setAnimate] = useState(!atStart);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true)
    }, 250);
    return setAnimate(false); 
  }, []);

  function calculateKB(kbParam: kenBurnsParam, atStart: boolean) {
    let cx;
    let cy;
    let initialBreadth;
    if (atStart) {
      cx = kbp.startX * imageWidth;
      cy = kbp.startY * imageHeight;
      initialBreadth = kbp.startB * imageWidth;
    } else {
      cx = kbp.endX * imageWidth;
      cy = kbp.endY * imageHeight;
      initialBreadth = kbp.endB * imageWidth;
    }

    //This is the natural scale that scales the fraame to the size of the image.
    var frameScale = Math.min(
      imageHeight / frameHeight,
      imageWidth / frameWidth
    );

    // Make sure the breadth can stay within the view. We start with
    // initialBreadth which is what we want. Then we make sure we are
    // not larger than the image's width or height. Finally, we make
    // sure we are not greater than the dimension of the frame scaled up
    // to fit just inside the image.
    var breadth = Math.min(
      initialBreadth,
      imageWidth,
      imageHeight,
      frameScale * frameWidth,
      frameScale * frameHeight
    );

    // With the breadth we can now calculate the scale we will use.
    var scale = Math.min(frameHeight / breadth, frameWidth / breadth);

    // These are the sizes of the frame scaled to the full image.
    var mappedWidth = frameWidth / scale;
    var mappedHeight = frameHeight / scale;

    // Get us to upper left again.
    var left = -(((1 - scale) * imageWidth) / 2 / scale);
    var top = -(((1 - scale) * imageHeight) / 2 / scale);

    // Now factor in where we want to be.
    left -= Math.max(
      0,
      Math.min(cx - mappedWidth / 2, imageWidth - mappedWidth)
    );
    top -= Math.max(
      0,
      Math.min(cy - mappedHeight / 2, imageHeight - mappedHeight)
    );
    let transform = `scale(${scale}) translate(${left}px, ${top}px)`;

    let styleObject = {
      width: imageWidth,
      height: imageHeight,
      backgroundColor: backgroundColor,
      transitionProperty: "transform",
      transform: transform,
      // transform: `scale(${scale}) translate(${left}px, ${top})`,
      transitionDuration: atStart ? "0s" : "8s",
    };
    return styleObject;
  }

  const startStyle = calculateKB(kbp, true);
  const endStyle = calculateKB(kbp, false);

  return (
    <img src={imageUrl} style={animate ? endStyle : startStyle} alt="slide" />
  );
};
export default KbImage;
