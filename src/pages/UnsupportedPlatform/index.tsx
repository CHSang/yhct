import React from "react";
import styled from "styled-components";

const UnsupportedPlatformWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  label {
    color: green;
    font-size: 5vmin;
    font-weight: bold;
    margin-bottom: 1vmin;
    text-align: center;
  }
`;

const UnsupportedPlatform = ({ errorMessage}: {errorMessage: string})  => {
  return (
    <UnsupportedPlatformWrapper>
      <label>{errorMessage}</label>
    </UnsupportedPlatformWrapper>
  );
};

export default UnsupportedPlatform;
