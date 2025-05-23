import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currIndex, setcurrIndex] = useState(1);
  const [isClicked, setisClicked] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [noOfVideosLoaded, setnoOfVideosLoaded] = useState(0);

  const noOfVideosTotal = 3;
  const nextVideoRef = useRef(null);
  const nextVideoIndex = (currIndex % noOfVideosTotal) + 1;

  const handleMiniVideoClick = () => {
    setisClicked(true);
    setcurrIndex(nextVideoIndex);
  };

  const handleVideoLoad = () => {
    setnoOfVideosLoaded((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    if (noOfVideosLoaded === noOfVideosTotal - 1) {
      setisLoading(false);
    }
  }, [noOfVideosLoaded]);

  useGSAP(
    () => {
      if (isClicked) {
        gsap.set("#curr-video", { visibility: "visible" });

        gsap.to("#curr-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "Power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#next-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currIndex], revertOnUpdate: true }
  );
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)",
      borderRadius: "0 0 0 0",
    });

    gsap.to("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => {
    return `videos/hero-${index}.mp4`;
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(nextVideoIndex)}
                loop
                muted
                id="next-video"
                className="size-64 origin-center scale-150 object-center object-cover"
                onLoadedData={handleVideoLoad}
              ></video>
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currIndex)}
            loop
            muted
            id="curr-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          ></video>
          <video
            src={getVideoSrc(currIndex === noOfVideosTotal - 1 ? 1 : currIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          ></video>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the MetaVerse <br />
              Unleash yourself
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
