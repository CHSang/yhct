import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  .d-none {
    display: none;
  }

  .pointer-event-none {
    pointer-events: none;
  }

  .video_section {
    position: absolute;
    z-index: 1;
    top: 1vmin;
    left: 2vmin;

    video {
      height: 40vmin;
      border-radius: 3vmin;
    }
  }

  .header {
    position: relative;
    img {
      width: 100vw;
      height: auto;
    }
    .title {
      position: absolute;
      bottom: 8vmin;
      right: 5vmin;
      color: white;
      font-size: 7vmin;
      text-align: right;
      font-weight: bold;
    }
  }

  .body {
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    flex-direction: inherit;
    position: relative;

    .icon_section {
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
      flex-direction: inherit;
      position: absolute;
      top: -9vmin;
      right: -9vmin;

      .opacity_0 {
        opacity: 0;
      }

      svg {
        margin-bottom: 3vmin;
        border: 1px solid;
        box-sizing: content-box;
        padding: 3vmin;
        border-radius: 50%;
        background: green;
        color: white;
        width: 6vmin;
        height: 6vmin;
      }
    }

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      label {
        font-size: 5vmin;
        color: darkgreen;
        font-weight: bold;
      }

      .body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;

        label {
          width: min-content;
          text-align: center;
        }

        .image {
          margin: 3vmin;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          .ant-progress-inner {
            width: 45vmin !important;
            height: 45vmin  !important;
          }

          img {
            position: absolute;
            width: 40vmin;
            height: 40vmin;
          }
        }
      }
    }

    .counter {
      margin-top: 5vmin;
      margin-bottom: 3vmin;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .counter_count {
        border: 1px solid black;
        width: 15vmin;
        height: 15vmin;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        background: forestgreen;
        color: white;
        font-size: 7vmin;
        border-width: thick;
        margin-bottom: 2vmin;
      }

      .counter_time {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 7vmin;
        font-weight: bold;
        color: green;
      }
    }

    .button_section {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      button {
        margin-bottom: 3vmin;
        width: 50vmin;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
