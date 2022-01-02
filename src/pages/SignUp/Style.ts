import styled from "styled-components";

export const SignUpWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0vh 5vw;

  img {
    width: 100vw;
  }

  .content {
    margin-bottom: 10px;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    flex-direction: column;

    .caption {
      font-size: 10vw;
      color: green;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 2vh;
    }

    .button_submit {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ant-alert-content {
      font-size: 4vmin;
    }
  }
`;
