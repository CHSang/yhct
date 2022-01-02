import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0vh 5vw;

  img {
    width: 50vmin;
    height: 50vmin;
  }

  .caption {
    font-size: 10vmin;
    color: green;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 5vmin;
  }

  .button_submit {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .button_register {
      font-weight: bold;
      margin-top: 5px;

      button {
        background: transparent;
        color: green;
      }
    }
  }

  .ant-alert-message {
    font-size: 4vmin;
  }

  .checkbox_section {
    display: flex;
    margin-bottom: 3vh;

    .ant-checkbox-wrapper {
      font-size: 5vmin;
      display: flex;
      align-items: center;

      .ant-checkbox {
        top: 0 !important;
      }

      .ant-checkbox-inner {
        border-color: green;
      }

      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: green;
        border-color: green;
      }
    }

    span {
      color: green;
    }
  }
`;
