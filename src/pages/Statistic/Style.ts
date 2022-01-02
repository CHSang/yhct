import styled from "styled-components";

export const StatisticWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex_column {
    flex-direction: column;
  }

  .caption {
    font-size: 10vmin;
    color: green;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 5vmin;
  }

  .summary {
    font-weight: bold;
    font-size: 5vmin;
    color: green;
    border: 2vmin solid green;
    padding: 4vmin;
    border-radius: 5vmin;

    .separator {
      border: 1px solid green;
      height: 15vmin;
      margin: 0 4vmin;
    }

    .result {
      border-top: 1px solid green;
      width: 100%;
      text-align: center;
      border-width: medium;
      margin-top: 2vmin;
      font-size: 8vmin;
    }
  }

  .filter {
    margin-top: 3vmin;
  }

  .date_picker {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    label {
      font-size: 5vmin;
      font-weight: bold;
      color: green;
    }
  }

  .chart_section {
    margin-top: 4vmin;
    canvas {
      height: 50vmin !important;
    }
  }

  .button_section {
    margin-top: 5vmin;
  }
`;
