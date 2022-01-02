import { useEffect, useState } from "react";
import styled from "styled-components";
import { getUploadFIle, getUserInfo } from "../../services/FirebaseService";
import { UserInfo } from "../../share/Type";

export const VideoViewerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  label {
    font-size: 8vmin;
    font-weight: bold;
    color: green;
  }

  video {
    height: 100vh;
    width: 100vw;
  }
`;
const VideoViewer = ({ email }: { email: string }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [recordingURL, setRecordingURL] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      let response: UserInfo | null = await getUserInfo(email);
      setUser(response);
    }
    getUser();
    setLoading(true);
    setRecordingURL(null);
  }, [email]);

  useEffect(() => {
    async function setUploadFile() {
      if (user) {
        let url = await getUploadFIle(user?.email);
        setRecordingURL(url || "");
      }
    }

    setUploadFile();
  }, [user]);

  useEffect(() => {
    if (recordingURL) {
      setLoading(false);
    }
  }, [recordingURL])

  return (
    <>
      {!isLoading && (
        <VideoViewerWrapper>
          {recordingURL ? (
            <video src={recordingURL} controls />
          ) : (
            <label>Bạn chưa có video nào</label>
          )}
        </VideoViewerWrapper>
      )}
    </>
  );
};

export default VideoViewer;
