import styled from "styled-components";
import { getImage } from "../../services/AssertService";

const BackgroundLayerWrapper = styled.div`
  width: 100vw;
  height: 100vh !important;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 100vw;
  }

  .custom_content {
    height: 70vh;
    overflow: scroll;
  }

  .custom_content_show_img_bottom {
    height: 80vh;
    overflow: scroll;
  }

  .img_top {
    height: 20vh;
  }

  .img_bottom {
    height: 10vh;
  }
`;

type Props = {
  children?: JSX.Element;
  showImgBottom?: boolean;
};

const BackgroundLayer: React.FC<Props> = ({
  children,
  showImgBottom = true,
}) => (
  <BackgroundLayerWrapper>
    {
      <img
        src={getImage("background_top.jpg")}
        alt="background_top"
        className={"img_top"}
      />
    }
    <div
      className={`${
        showImgBottom ? "custom_content" : "custom_content_show_img_bottom"
      }`}
    >
      {children}
    </div>

    {showImgBottom && (
      <img
        src={getImage("background_bottom.jpg")}
        alt="background_bottom"
        className={"img_bottom"}
      />
    )}
  </BackgroundLayerWrapper>
);

export default BackgroundLayer;
