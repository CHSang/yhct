import { useEffect, useRef } from "react";
import styled from "styled-components";
import { isIOSVersion } from "../../services/PlatformService";

type VideoPreviewProps = {
  allowPermisisonStatusChangeHandler: Function;
};

export const VideoPreviewWrapper = styled.div``;

const VideoPreview = ({
  allowPermisisonStatusChangeHandler,
}: VideoPreviewProps) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((stream) => {
        let video = document.createElement("video");
        video.srcObject = stream;
        video.muted = true;
        video.addEventListener("loadedmetadata", () => {
          video.play();
          if (videoContainerRef && videoContainerRef.current) {
            videoContainerRef.current.append(video);
          }
        });
        allowPermisisonStatusChangeHandler(true);
      })
      .catch((error) => {
        allowPermisisonStatusChangeHandler(false);
      });
  }, []);

  return <VideoPreviewWrapper ref={videoContainerRef}></VideoPreviewWrapper>;
};

export default VideoPreview;
